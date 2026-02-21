import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PatientsService } from '../patients/patients.service';
import {
  QuestionType,
  TestDefinition,
  TestDocument,
  TestOption,
  TestScoringMode,
} from '../tests/schemas/test.schema';
import {
  AnswerInputDto,
  CreateTestResultDto,
} from './dto/create-test-result.dto';
import { UpdateResultNotesDto } from './dto/update-result-notes.dto';
import { TestResult, TestResultDocument } from './schemas/test-result.schema';

interface ScoredAnswer {
  questionId: string;
  optionId?: string;
  value: number;
  textResponse?: string;
  drawingDataUrl?: string;
}

interface EvaluatedSubmission {
  answers: ScoredAnswer[];
  totalScore: number;
  interpretationLabel: string;
  interpretationDescription: string;
  profileScores: Record<string, number>;
}

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(TestResult.name)
    private readonly resultModel: Model<TestResultDocument>,
    @InjectModel(TestDefinition.name)
    private readonly testModel: Model<TestDocument>,
    private readonly patientsService: PatientsService,
  ) {}

  async create(psychologistId: string, dto: CreateTestResultDto) {
    await this.patientsService.findOne(psychologistId, dto.patientId);

    const test = await this.testModel.findById(dto.testId).lean().exec();
    if (!test) {
      throw new NotFoundException('Prueba no encontrada');
    }

    const evaluation = this.evaluateSubmission(test, dto.answers);

    const created = await this.resultModel.create({
      psychologistId,
      patientId: dto.patientId,
      testId: dto.testId,
      answers: evaluation.answers,
      totalScore: evaluation.totalScore,
      profileScores: evaluation.profileScores,
      interpretationLabel: evaluation.interpretationLabel,
      interpretationDescription: evaluation.interpretationDescription,
      observations: dto.observations,
      finalConclusion: dto.finalConclusion,
      recommendation: dto.recommendation,
      evaluatedAt: dto.evaluatedAt ? new Date(dto.evaluatedAt) : new Date(),
    });

    return this.resultModel
      .findById(created.id)
      .populate('testId', 'name category')
      .lean()
      .exec();
  }

  async createFromSubmission(params: {
    psychologistId: string;
    patientId: string;
    testId: string;
    answers: AnswerInputDto[];
    evaluatedAt?: Date;
    sourceSessionId?: Types.ObjectId;
  }) {
    const test = await this.testModel.findById(params.testId).lean().exec();

    if (!test) {
      throw new NotFoundException('Prueba no encontrada');
    }

    const evaluation = this.evaluateSubmission(test, params.answers);

    const created = await this.resultModel.create({
      psychologistId: params.psychologistId,
      patientId: params.patientId,
      testId: params.testId,
      answers: evaluation.answers,
      totalScore: evaluation.totalScore,
      profileScores: evaluation.profileScores,
      interpretationLabel: evaluation.interpretationLabel,
      interpretationDescription: evaluation.interpretationDescription,
      evaluatedAt: params.evaluatedAt ?? new Date(),
      sourceSessionId: params.sourceSessionId,
    });

    return this.resultModel
      .findById(created.id)
      .populate('testId', 'name category')
      .lean()
      .exec();
  }

  async findByPatient(psychologistId: string, patientId: string) {
    await this.patientsService.findOne(psychologistId, patientId);

    return this.resultModel
      .find({ psychologistId, patientId })
      .sort({ evaluatedAt: -1, createdAt: -1 })
      .populate('testId', 'name category')
      .lean()
      .exec();
  }

  async updateNotes(
    psychologistId: string,
    resultId: string,
    dto: UpdateResultNotesDto,
  ) {
    const updated = await this.resultModel
      .findOneAndUpdate({ _id: resultId, psychologistId }, dto, {
        new: true,
        runValidators: true,
      })
      .populate('testId', 'name category')
      .lean()
      .exec();

    if (!updated) {
      throw new NotFoundException('Resultado no encontrado');
    }

    return updated;
  }

  evaluateSubmission(
    test: Pick<
      TestDefinition,
      'questions' | 'interpretationRanges' | 'name' | 'scoringMode'
    >,
    answers: AnswerInputDto[],
  ): EvaluatedSubmission {
    const answerByQuestion = new Map(
      answers.map((item) => [item.questionId, item]),
    );

    const scoredAnswers: ScoredAnswer[] = [];
    const profileScores: Record<string, number> = {};

    for (const question of test.questions) {
      const response = answerByQuestion.get(question.id);
      const isRequired = question.required !== false;

      if (!response) {
        if (isRequired) {
          throw new BadRequestException(
            `Falta respuesta para la pregunta ${question.id}`,
          );
        }
        continue;
      }

      const questionType = question.type ?? QuestionType.SINGLE_CHOICE;

      if (questionType === QuestionType.SINGLE_CHOICE) {
        const optionId = response.optionId?.trim();
        if (!optionId) {
          throw new BadRequestException(
            `Falta opción para la pregunta ${question.id}`,
          );
        }

        const selectedOption = question.options.find(
          (option: TestOption) => option.id === optionId,
        );

        if (!selectedOption) {
          throw new BadRequestException(
            `Opción inválida para la pregunta ${question.id}`,
          );
        }

        const optionValue = selectedOption.value ?? 0;
        const optionProfileScores = this.toNumberRecord(
          selectedOption.profileScores,
        );

        for (const [key, value] of Object.entries(optionProfileScores)) {
          profileScores[key] = (profileScores[key] ?? 0) + value;
        }

        scoredAnswers.push({
          questionId: question.id,
          optionId: selectedOption.id,
          value: optionValue,
        });
        continue;
      }

      if (questionType === QuestionType.TEXT) {
        const textResponse = response.textResponse?.trim();

        if (isRequired && !textResponse) {
          throw new BadRequestException(
            `Falta respuesta de texto para la pregunta ${question.id}`,
          );
        }

        scoredAnswers.push({
          questionId: question.id,
          textResponse,
          value: 0,
        });
        continue;
      }

      if (questionType === QuestionType.DRAWING) {
        const drawingDataUrl = response.drawingDataUrl?.trim();

        if (isRequired && !drawingDataUrl) {
          throw new BadRequestException(
            `Falta dibujo para la pregunta ${question.id}`,
          );
        }

        if (drawingDataUrl && !drawingDataUrl.startsWith('data:image/')) {
          throw new BadRequestException(
            `Formato de dibujo inválido en la pregunta ${question.id}`,
          );
        }

        scoredAnswers.push({
          questionId: question.id,
          drawingDataUrl,
          value: 0,
        });
      }
    }

    if (scoredAnswers.length === 0) {
      throw new BadRequestException('No se recibieron respuestas válidas');
    }

    const totalScore = scoredAnswers.reduce(
      (sum, answer) => sum + answer.value,
      0,
    );

    const interpretation = this.resolveInterpretation(test, totalScore);

    return {
      answers: scoredAnswers,
      totalScore,
      interpretationLabel: interpretation.label,
      interpretationDescription: interpretation.description,
      profileScores,
    };
  }

  private resolveInterpretation(
    test: Pick<
      TestDefinition,
      'questions' | 'interpretationRanges' | 'scoringMode'
    >,
    totalScore: number,
  ) {
    if (test.scoringMode === TestScoringMode.MANUAL) {
      return {
        label: 'Pendiente análisis',
        description:
          'La prueba fue completada y requiere revisión profesional para su interpretación final.',
      };
    }

    const rangeMatch = test.interpretationRanges.find(
      (range) => totalScore >= range.min && totalScore <= range.max,
    );

    if (rangeMatch) {
      return {
        label: rangeMatch.label,
        description: rangeMatch.description,
      };
    }

    const scoringQuestions = test.questions.filter(
      (question) =>
        (question.type ?? QuestionType.SINGLE_CHOICE) ===
          QuestionType.SINGLE_CHOICE && question.options.length > 0,
    );

    if (scoringQuestions.length === 0) {
      return {
        label: 'Registro completo',
        description:
          'La sesión fue registrada correctamente. Se recomienda análisis cualitativo de las respuestas.',
      };
    }

    const minScore = scoringQuestions.reduce(
      (sum, question) =>
        sum + Math.min(...question.options.map((option) => option.value ?? 0)),
      0,
    );

    const maxScore = scoringQuestions.reduce(
      (sum, question) =>
        sum + Math.max(...question.options.map((option) => option.value ?? 0)),
      0,
    );

    const span = maxScore - minScore;

    if (span <= 0) {
      return {
        label: 'Registro completo',
        description:
          'La sesión fue registrada correctamente. Se recomienda análisis cualitativo de las respuestas.',
      };
    }

    const lowerCut = minScore + span / 3;
    const upperCut = minScore + (span * 2) / 3;

    if (totalScore <= lowerCut) {
      return {
        label: 'Bajo',
        description:
          'Resultado en el tercio inferior de la escala general definida para esta prueba.',
      };
    }

    if (totalScore <= upperCut) {
      return {
        label: 'Medio',
        description:
          'Resultado en el tercio medio de la escala general definida para esta prueba.',
      };
    }

    return {
      label: 'Alto',
      description:
        'Resultado en el tercio superior de la escala general definida para esta prueba.',
    };
  }

  private toNumberRecord(value: unknown): Record<string, number> {
    if (!value) {
      return {};
    }

    if (value instanceof Map) {
      return Object.fromEntries(
        Array.from(value.entries()).map(([key, entryValue]) => [
          key,
          Number(entryValue ?? 0),
        ]),
      );
    }

    if (typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>);
      return Object.fromEntries(
        entries.map(([key, entryValue]) => [key, Number(entryValue ?? 0)]),
      );
    }

    return {};
  }
}
