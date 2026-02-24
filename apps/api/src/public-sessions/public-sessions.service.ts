import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes } from 'node:crypto';
import { PatientsService } from '../patients/patients.service';
import { AnswerInputDto } from '../results/dto/create-test-result.dto';
import { ResultsService } from '../results/results.service';
import {
  QuestionType,
  TestDefinition,
  TestDocument,
} from '../tests/schemas/test.schema';
import { CreatePublicSessionDto } from './dto/create-public-session.dto';
import {
  PublicSessionAnswerDto,
  SavePublicSessionDto,
  SubmitPublicSessionDto,
} from './dto/save-public-session.dto';
import {
  PublicSession,
  PublicSessionDocument,
  PublicSessionStatus,
} from './schemas/public-session.schema';

type SessionQuestion = TestDefinition['questions'][number];

@Injectable()
export class PublicSessionsService {
  constructor(
    @InjectModel(PublicSession.name)
    private readonly sessionModel: Model<PublicSessionDocument>,
    @InjectModel(TestDefinition.name)
    private readonly testModel: Model<TestDocument>,
    private readonly patientsService: PatientsService,
    private readonly resultsService: ResultsService,
    private readonly configService: ConfigService,
  ) {}

  async create(psychologistId: string, dto: CreatePublicSessionDto) {
    await this.patientsService.findOne(psychologistId, dto.patientId);

    const test = await this.testModel
      .findOne({ _id: dto.testId, active: true })
      .lean()
      .exec();

    if (!test) {
      throw new NotFoundException('Prueba no encontrada');
    }

    const token = await this.generateUniqueToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (dto.expiresInDays ?? 7));

    const created = await this.sessionModel.create({
      psychologistId,
      patientId: dto.patientId,
      testId: dto.testId,
      token,
      expiresAt,
      status: PublicSessionStatus.CREATED,
    });

    return {
      id: created.id,
      token,
      status: created.status,
      expiresAt: created.expiresAt,
      publicUrl: this.buildPublicUrl(token),
    };
  }

  async findByPatient(psychologistId: string, patientId: string) {
    await this.patientsService.findOne(psychologistId, patientId);

    const sessions = await this.sessionModel
      .find({ psychologistId, patientId })
      .select('token status expiresAt startedAt submittedAt testId resultId')
      .sort({ createdAt: -1 })
      .populate('testId', 'name category')
      .populate('resultId', 'totalScore interpretationLabel evaluatedAt')
      .lean()
      .exec();

    return sessions.map((session) => ({
      id: String(session._id),
      token: session.token,
      status: session.status,
      expiresAt: session.expiresAt,
      startedAt: session.startedAt,
      submittedAt: session.submittedAt,
      testId: session.testId,
      resultId: session.resultId,
      publicUrl: this.buildPublicUrl(session.token),
    }));
  }

  async getPublicSession(token: string) {
    const session = await this.sessionModel
      .findOne({ token })
      .populate('patientId', 'fullName')
      .populate({
        path: 'testId',
        select:
          'name category description instructions questions interpretationRanges scoringMode',
      })
      .lean()
      .exec();

    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    const isExpired = this.isExpired(session.expiresAt);
    const status = this.resolveStatus(session.status, isExpired);

    if (
      isExpired &&
      session.status !== PublicSessionStatus.SUBMITTED &&
      session.status !== PublicSessionStatus.EXPIRED
    ) {
      await this.sessionModel
        .updateOne(
          { _id: session._id },
          { $set: { status: PublicSessionStatus.EXPIRED } },
        )
        .exec();
    }

    const patient =
      typeof session.patientId === 'object' && session.patientId
        ? session.patientId
        : null;

    const test =
      typeof session.testId === 'object' && session.testId
        ? session.testId
        : null;

    if (!test) {
      throw new NotFoundException('Prueba no encontrada para esta sesión');
    }

    return {
      token: session.token,
      status,
      expiresAt: session.expiresAt,
      startedAt: session.startedAt,
      submittedAt: session.submittedAt,
      patient: {
        fullName:
          patient && 'fullName' in patient
            ? String(patient.fullName)
            : 'Paciente',
      },
      test,
      answers: session.responses ?? [],
    };
  }

  async saveProgress(token: string, dto: SavePublicSessionDto) {
    const session = await this.sessionModel.findOne({ token }).exec();
    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    this.ensureSessionAvailable(session.status, session.expiresAt);

    const test = await this.testModel.findById(session.testId).lean().exec();

    if (!test) {
      throw new NotFoundException('Prueba no encontrada para esta sesión');
    }

    const sanitizedAnswers = this.sanitizeAnswers(test, dto.answers);

    session.responses = sanitizedAnswers;
    session.status = PublicSessionStatus.IN_PROGRESS;
    if (!session.startedAt) {
      session.startedAt = new Date();
    }

    await session.save();

    const answeredQuestionIds = new Set(
      sanitizedAnswers.map((item) => item.questionId),
    );

    return {
      saved: true,
      status: session.status,
      answeredCount: answeredQuestionIds.size,
      totalQuestions: test.questions.length,
    };
  }

  async submit(token: string, dto: SubmitPublicSessionDto) {
    const session = await this.sessionModel.findOne({ token }).exec();
    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    this.ensureSessionAvailable(session.status, session.expiresAt, true);

    if (session.status === PublicSessionStatus.SUBMITTED && session.resultId) {
      return {
        submitted: true,
        status: session.status,
        resultId: String(session.resultId),
      };
    }

    const test = await this.testModel.findById(session.testId).lean().exec();

    if (!test) {
      throw new NotFoundException('Prueba no encontrada para esta sesión');
    }

    const answerSource = dto.answers ?? session.responses;
    const sanitizedAnswers = this.sanitizeAnswers(test, answerSource);

    const evaluation = this.resultsService.evaluateSubmission(
      test,
      sanitizedAnswers,
    );

    const result = await this.resultsService.createFromSubmission({
      psychologistId: String(session.psychologistId),
      patientId: String(session.patientId),
      testId: String(session.testId),
      answers: sanitizedAnswers,
      evaluatedAt: new Date(),
      sourceSessionId: session._id,
    });

    session.responses = sanitizedAnswers;
    session.status = PublicSessionStatus.SUBMITTED;
    session.startedAt = session.startedAt ?? new Date();
    session.submittedAt = new Date();
    session.totalScore = evaluation.totalScore;
    session.profileScores = evaluation.profileScores;
    session.interpretationLabel = evaluation.interpretationLabel;
    session.interpretationDescription = evaluation.interpretationDescription;
    session.resultId = result?._id;

    await session.save();

    return {
      submitted: true,
      status: session.status,
      resultId: result?._id,
      totalScore: evaluation.totalScore,
      interpretationLabel: evaluation.interpretationLabel,
      interpretationDescription: evaluation.interpretationDescription,
    };
  }

  private sanitizeAnswers(
    test: Pick<TestDefinition, 'questions'>,
    answers: Array<PublicSessionAnswerDto | AnswerInputDto>,
  ): AnswerInputDto[] {
    const questionMap = new Map(
      test.questions.map((question) => [question.id, question]),
    );
    const deduped = new Map<string, AnswerInputDto>();

    for (const answer of answers) {
      const question = questionMap.get(answer.questionId);

      if (!question) {
        throw new BadRequestException(
          `La pregunta ${answer.questionId} no existe en esta prueba`,
        );
      }

      const sanitizedAnswer = this.sanitizeSingleAnswer(question, answer);

      if (sanitizedAnswer) {
        deduped.set(question.id, sanitizedAnswer);
      }
    }

    return Array.from(deduped.values());
  }

  private sanitizeSingleAnswer(
    question: SessionQuestion,
    answer: PublicSessionAnswerDto | AnswerInputDto,
  ): AnswerInputDto | null {
    const questionType = question.type ?? QuestionType.SINGLE_CHOICE;

    if (questionType === QuestionType.SINGLE_CHOICE) {
      return this.sanitizeSingleChoiceAnswer(question, answer);
    }

    if (questionType === QuestionType.TEXT) {
      return this.sanitizeTextAnswer(question, answer);
    }

    return this.sanitizeDrawingAnswer(question, answer);
  }

  private sanitizeSingleChoiceAnswer(
    question: SessionQuestion,
    answer: PublicSessionAnswerDto | AnswerInputDto,
  ): AnswerInputDto | null {
    const optionId = answer.optionId?.trim();

    if (!optionId) {
      return null;
    }

    const optionExists = question.options.some(
      (option) => option.id === optionId,
    );

    if (!optionExists) {
      throw new BadRequestException(
        `Opción inválida para la pregunta ${question.id}`,
      );
    }

    return {
      questionId: question.id,
      optionId,
    };
  }

  private sanitizeTextAnswer(
    question: SessionQuestion,
    answer: PublicSessionAnswerDto | AnswerInputDto,
  ): AnswerInputDto | null {
    const textResponse = answer.textResponse?.trim();

    if (!textResponse) {
      return null;
    }

    return {
      questionId: question.id,
      textResponse,
    };
  }

  private sanitizeDrawingAnswer(
    question: SessionQuestion,
    answer: PublicSessionAnswerDto | AnswerInputDto,
  ): AnswerInputDto | null {
    const drawingDataUrl = answer.drawingDataUrl?.trim();

    if (!drawingDataUrl) {
      return null;
    }

    if (!drawingDataUrl.startsWith('data:image/')) {
      throw new BadRequestException(
        `Formato de dibujo inválido para la pregunta ${question.id}`,
      );
    }

    return {
      questionId: question.id,
      drawingDataUrl,
    };
  }

  private ensureSessionAvailable(
    status: PublicSessionStatus,
    expiresAt: Date,
    allowSubmitted = false,
  ) {
    if (this.isExpired(expiresAt) || status === PublicSessionStatus.EXPIRED) {
      throw new BadRequestException('La sesión ya expiró');
    }

    if (!allowSubmitted && status === PublicSessionStatus.SUBMITTED) {
      throw new BadRequestException('La sesión ya fue finalizada');
    }
  }

  private resolveStatus(status: PublicSessionStatus, isExpired: boolean) {
    if (status === PublicSessionStatus.SUBMITTED) {
      return status;
    }

    if (isExpired) {
      return PublicSessionStatus.EXPIRED;
    }

    return status;
  }

  private isExpired(expiresAt: Date): boolean {
    return new Date(expiresAt).getTime() < Date.now();
  }

  private buildPublicUrl(token: string): string {
    const configuredOrigin =
      this.configService.getOrThrow<string>('WEB_ORIGIN');
    const origin =
      configuredOrigin.split(',')[0]?.trim() ?? 'http://localhost:4321';
    return `${origin.replace(/\/$/, '')}/session/${token}`;
  }

  private async generateUniqueToken(): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const token = randomBytes(24).toString('base64url');
      const existing = await this.sessionModel.exists({ token });
      if (!existing) {
        return token;
      }
    }

    throw new BadRequestException(
      'No se pudo generar un token único, intenta nuevamente',
    );
  }
}
