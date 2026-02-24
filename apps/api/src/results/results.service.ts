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

interface ResultAnswerDetail extends ScoredAnswer {
  questionText: string;
  questionType: QuestionType;
  optionText?: string;
}

type ValantiDimensionKey =
  | 'verdad'
  | 'rectitud'
  | 'paz'
  | 'amor'
  | 'noViolencia';

interface ValantiDimensionScore {
  key: ValantiDimensionKey;
  label: string;
  directScore: number;
  mean: number;
  stdDev: number;
  standardizedScore: number;
  distanceFromBaseline: number;
  interpretationLabel: string;
}

interface ValantiProfileDetail {
  baselineScore: number;
  dimensions: ValantiDimensionScore[];
  topDimensionKey: ValantiDimensionKey;
  topDimensionLabel: string;
  lowDimensionKey: ValantiDimensionKey;
  lowDimensionLabel: string;
  summaryText: string;
  narrative: string[];
}

type TestQuestion = TestDefinition['questions'][number];

const VALANTI_BASELINE_STANDARD_SCORE = 50;

const VALANTI_DIMENSION_META: Array<{
  key: ValantiDimensionKey;
  label: string;
  mean: number;
  stdDev: number;
  highTraits: string;
  lowTraits: string;
}> = [
  {
    key: 'verdad',
    label: 'Verdad',
    mean: 15.65,
    stdDev: 4.7,
    highTraits:
      'da prioridad a la dimensión intelectual del valor, con énfasis en veracidad, raciocinio, curiosidad y honestidad intelectual',
    lowTraits:
      'muestra menor prioridad relativa en la dimensión intelectual del valor y puede apoyarse más en otros ejes para orientar sus decisiones',
  },
  {
    key: 'rectitud',
    label: 'Rectitud',
    mean: 21.05,
    stdDev: 4.44,
    highTraits:
      'resalta la dimensión de compromiso, confiabilidad, deber, cumplimiento de normas, respeto y responsabilidad',
    lowTraits:
      'da menor peso relativo a la dimensión de disciplina y compromiso, privilegiando otros criterios valorales',
  },
  {
    key: 'paz',
    label: 'Paz',
    mean: 17.35,
    stdDev: 6.61,
    highTraits:
      'resalta la dimensión emocional del valor, con prioridad en calma, conciliación, paciencia, reflexión y satisfacción',
    lowTraits:
      'la dimensión emocional asociada a calma y serenidad aparece con menor prioridad relativa frente a otros valores',
  },
  {
    key: 'amor',
    label: 'Amor',
    mean: 16.68,
    stdDev: 5.41,
    highTraits:
      'resalta la dimensión social del valor, con énfasis en amabilidad, amistad, ayuda, apoyo y compartir',
    lowTraits:
      'la dimensión social-afectiva del valor aparece en segundo plano relativo, con menor énfasis en ayuda y afiliación',
  },
  {
    key: 'noViolencia',
    label: 'No violencia',
    mean: 21.22,
    stdDev: 7.19,
    highTraits:
      'resalta la dimensión espiritual y universal del valor, orientada a justicia social, unidad humana, respeto amplio y fraternidad',
    lowTraits:
      'otorga menor peso relativo a la dimensión espiritual-universal del valor, priorizando otras dimensiones',
  },
];

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
      .select(
        'testId totalScore profileScores interpretationLabel interpretationDescription observations finalConclusion recommendation evaluatedAt createdAt',
      )
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
      .select(
        'testId totalScore profileScores interpretationLabel interpretationDescription observations finalConclusion recommendation evaluatedAt createdAt',
      )
      .populate('testId', 'name category')
      .lean()
      .exec();
  }

  async findByPatient(psychologistId: string, patientId: string) {
    await this.patientsService.findOne(psychologistId, patientId);

    return this.resultModel
      .find({ psychologistId, patientId })
      .select(
        'testId totalScore profileScores interpretationLabel interpretationDescription observations finalConclusion recommendation evaluatedAt createdAt',
      )
      .sort({ evaluatedAt: -1, createdAt: -1 })
      .populate('testId', 'name category')
      .lean()
      .exec();
  }

  async findDetail(psychologistId: string, resultId: string) {
    const result = await this.resultModel
      .findOne({ _id: resultId, psychologistId })
      .select(
        'testId answers profileScores totalScore interpretationLabel interpretationDescription evaluatedAt',
      )
      .lean()
      .exec();

    if (!result) {
      throw new NotFoundException('Resultado no encontrado');
    }

    const test = await this.testModel
      .findById(result.testId)
      .select('name questions profileLabels')
      .lean()
      .exec();

    if (!test) {
      throw new NotFoundException('Prueba no encontrada para este resultado');
    }

    const questionMap = new Map(
      test.questions.map((question) => [question.id, question]),
    );

    let profileScores = this.toNumberRecord(result.profileScores);
    const isValanti = this.isValantiTestName(test.name);

    if (isValanti && !this.hasValantiDirectScores(profileScores)) {
      const recomputedProfileScores =
        this.recomputeProfileScoresFromStoredAnswers(
          test.questions,
          result.answers ?? [],
        );

      if (this.hasValantiDirectScores(recomputedProfileScores)) {
        profileScores = recomputedProfileScores;
      }
    }

    const answers: ResultAnswerDetail[] = (result.answers ?? []).map(
      (answer) => {
        const question = questionMap.get(answer.questionId);
        const questionType = question?.type ?? QuestionType.SINGLE_CHOICE;
        const selectedOption = answer.optionId
          ? question?.options.find((option) => option.id === answer.optionId)
          : undefined;

        return {
          questionId: answer.questionId,
          questionText:
            question?.text ??
            `Pregunta no encontrada en la versión actual (${answer.questionId})`,
          questionType,
          optionId: answer.optionId,
          optionText: selectedOption?.text,
          textResponse: answer.textResponse,
          drawingDataUrl: answer.drawingDataUrl,
          value: Number(answer.value ?? 0),
        };
      },
    );

    return {
      _id: String(result._id),
      totalScore: result.totalScore,
      interpretationLabel: result.interpretationLabel,
      interpretationDescription: result.interpretationDescription,
      evaluatedAt: result.evaluatedAt,
      profileScores,
      profileLabels: this.toStringRecord(test.profileLabels),
      valantiProfile: isValanti
        ? (this.buildValantiProfile(profileScores) ?? undefined)
        : undefined,
      answers,
    };
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
      .select(
        'testId totalScore profileScores interpretationLabel interpretationDescription observations finalConclusion recommendation evaluatedAt createdAt',
      )
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
      const scoredAnswer = this.scoreQuestion(
        question,
        response,
        profileScores,
      );

      if (scoredAnswer) {
        scoredAnswers.push(scoredAnswer);
      }
    }

    if (scoredAnswers.length === 0) {
      throw new BadRequestException('No se recibieron respuestas válidas');
    }

    const totalScore = scoredAnswers.reduce(
      (sum, answer) => sum + answer.value,
      0,
    );

    const valantiProfile = this.isValantiTestName(test.name)
      ? this.buildValantiProfile(profileScores)
      : null;

    const interpretation = valantiProfile
      ? this.resolveValantiInterpretation(valantiProfile)
      : this.resolveInterpretation(test, totalScore);

    return {
      answers: scoredAnswers,
      totalScore,
      interpretationLabel: interpretation.label,
      interpretationDescription: interpretation.description,
      profileScores,
    };
  }

  private scoreQuestion(
    question: TestQuestion,
    response: AnswerInputDto | undefined,
    profileScores: Record<string, number>,
  ): ScoredAnswer | null {
    const isRequired = question.required !== false;

    if (!response) {
      if (isRequired) {
        throw new BadRequestException(
          `Falta respuesta para la pregunta ${question.id}`,
        );
      }

      return null;
    }

    const questionType = question.type ?? QuestionType.SINGLE_CHOICE;

    if (questionType === QuestionType.SINGLE_CHOICE) {
      return this.scoreSingleChoiceQuestion(question, response, profileScores);
    }

    if (questionType === QuestionType.TEXT) {
      return this.scoreTextQuestion(question.id, response, isRequired);
    }

    if (questionType === QuestionType.DRAWING) {
      return this.scoreDrawingQuestion(question.id, response, isRequired);
    }

    return null;
  }

  private scoreSingleChoiceQuestion(
    question: TestQuestion,
    response: AnswerInputDto,
    profileScores: Record<string, number>,
  ): ScoredAnswer {
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

    this.mergeProfileScores(
      profileScores,
      this.toNumberRecord(selectedOption.profileScores),
    );

    return {
      questionId: question.id,
      optionId: selectedOption.id,
      value: selectedOption.value ?? 0,
    };
  }

  private scoreTextQuestion(
    questionId: string,
    response: AnswerInputDto,
    isRequired: boolean,
  ): ScoredAnswer {
    const textResponse = response.textResponse?.trim();

    if (isRequired && !textResponse) {
      throw new BadRequestException(
        `Falta respuesta de texto para la pregunta ${questionId}`,
      );
    }

    return {
      questionId,
      textResponse,
      value: 0,
    };
  }

  private scoreDrawingQuestion(
    questionId: string,
    response: AnswerInputDto,
    isRequired: boolean,
  ): ScoredAnswer {
    const drawingDataUrl = response.drawingDataUrl?.trim();

    if (isRequired && !drawingDataUrl) {
      throw new BadRequestException(
        `Falta dibujo para la pregunta ${questionId}`,
      );
    }

    if (drawingDataUrl && !drawingDataUrl.startsWith('data:image/')) {
      throw new BadRequestException(
        `Formato de dibujo inválido en la pregunta ${questionId}`,
      );
    }

    return {
      questionId,
      drawingDataUrl,
      value: 0,
    };
  }

  private mergeProfileScores(
    profileScores: Record<string, number>,
    source: Record<string, number>,
  ) {
    for (const [key, value] of Object.entries(source)) {
      profileScores[key] = (profileScores[key] ?? 0) + value;
    }
  }

  private isValantiTestName(name?: string) {
    return name?.trim().toLowerCase() === 'valanti';
  }

  private hasValantiDirectScores(profileScores: Record<string, number>) {
    return VALANTI_DIMENSION_META.every(({ key }) =>
      Number.isFinite(profileScores[key]),
    );
  }

  private recomputeProfileScoresFromStoredAnswers(
    questions: TestQuestion[],
    answers: Array<Pick<ScoredAnswer, 'questionId' | 'optionId'>>,
  ) {
    const questionMap = new Map(
      questions.map((question) => [question.id, question]),
    );
    const recomputed: Record<string, number> = {};

    for (const answer of answers) {
      if (!answer.optionId) {
        continue;
      }

      const question = questionMap.get(answer.questionId);
      if (!question) {
        continue;
      }

      const option = question.options.find(
        (item) => item.id === answer.optionId,
      );
      if (!option) {
        continue;
      }

      this.mergeProfileScores(
        recomputed,
        this.toNumberRecord(option.profileScores),
      );
    }

    return recomputed;
  }

  private resolveValantiStandardLabel(score: number) {
    if (score <= 30) {
      return 'Bajo';
    }

    if (score <= 40) {
      return 'Promedio Bajo';
    }

    if (score <= 50) {
      return 'Promedio';
    }

    if (score <= 60) {
      return 'Promedio Alto';
    }

    return 'Alto';
  }

  private buildValantiProfile(
    profileScores: Record<string, number>,
  ): ValantiProfileDetail | null {
    if (!this.hasValantiDirectScores(profileScores)) {
      return null;
    }

    const dimensions = VALANTI_DIMENSION_META.map((meta) => {
      const directScore = Math.round(Number(profileScores[meta.key] ?? 0));
      const standardizedScore = Math.round(
        VALANTI_BASELINE_STANDARD_SCORE +
          (10 * (directScore - meta.mean)) / meta.stdDev,
      );
      const distanceFromBaseline =
        standardizedScore - VALANTI_BASELINE_STANDARD_SCORE;

      return {
        key: meta.key,
        label: meta.label,
        directScore,
        mean: meta.mean,
        stdDev: meta.stdDev,
        standardizedScore,
        distanceFromBaseline,
        interpretationLabel:
          this.resolveValantiStandardLabel(standardizedScore),
      } satisfies ValantiDimensionScore;
    });

    const topDimension = dimensions.reduce((best, current) =>
      current.standardizedScore > best.standardizedScore ? current : best,
    );
    const lowDimension = dimensions.reduce((worst, current) =>
      current.standardizedScore < worst.standardizedScore ? current : worst,
    );

    const summaryText =
      `Mayor peso relativo en ${topDimension.label} (${topDimension.standardizedScore}, ${topDimension.interpretationLabel}) ` +
      `y menor peso relativo en ${lowDimension.label} (${lowDimension.standardizedScore}, ${lowDimension.interpretationLabel}).`;

    const narrative = [
      `El área con mayor peso relativo es ${topDimension.label}. El área con menor peso relativo es ${lowDimension.label}.`,
      ...dimensions.map((dimension) => {
        const meta = VALANTI_DIMENSION_META.find(
          (item) => item.key === dimension.key,
        );
        const distanceAbs = Math.abs(dimension.distanceFromBaseline);

        if (!meta) {
          return `${dimension.label}: puntaje estándar ${dimension.standardizedScore} (${dimension.interpretationLabel}).`;
        }

        if (dimension.distanceFromBaseline > 0) {
          return `${dimension.label}: puntaje estándar ${dimension.standardizedScore} (${dimension.interpretationLabel}), ${distanceAbs} puntos por encima de la base 50; ${meta.highTraits}.`;
        }

        if (dimension.distanceFromBaseline < 0) {
          return `${dimension.label}: puntaje estándar ${dimension.standardizedScore} (${dimension.interpretationLabel}), ${distanceAbs} puntos por debajo de la base 50; ${meta.lowTraits}.`;
        }

        return `${dimension.label}: puntaje estándar ${dimension.standardizedScore} (${dimension.interpretationLabel}), en la base 50; muestra un peso relativo equilibrado en esta dimensión.`;
      }),
    ];

    return {
      baselineScore: VALANTI_BASELINE_STANDARD_SCORE,
      dimensions,
      topDimensionKey: topDimension.key,
      topDimensionLabel: topDimension.label,
      lowDimensionKey: lowDimension.key,
      lowDimensionLabel: lowDimension.label,
      summaryText,
      narrative,
    };
  }

  private resolveValantiInterpretation(profile: ValantiProfileDetail) {
    return {
      label: 'Perfil VALANTI',
      description: profile.summaryText,
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

  private toStringRecord(value: unknown): Record<string, string> {
    if (!value) {
      return {};
    }

    if (value instanceof Map) {
      return Object.fromEntries(
        Array.from(value.entries()).map(([key, entryValue]) => [
          key,
          String(entryValue ?? ''),
        ]),
      );
    }

    if (typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(
          ([key, entryValue]) => [key, String(entryValue ?? '')],
        ),
      );
    }

    return {};
  }
}
