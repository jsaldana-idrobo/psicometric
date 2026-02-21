import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientsService } from '../patients/patients.service';
import {
  TestDefinition,
  TestDocument,
  TestOption,
} from '../tests/schemas/test.schema';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateResultNotesDto } from './dto/update-result-notes.dto';
import { TestResult, TestResultDocument } from './schemas/test-result.schema';

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

    const answersWithValue = test.questions.map((question) => {
      const answer = dto.answers.find(
        (item) => item.questionId === question.id,
      );

      if (!answer) {
        throw new BadRequestException(
          `Falta respuesta para la pregunta ${question.id}`,
        );
      }

      const selectedOption = question.options.find(
        (option: TestOption) => option.id === answer.optionId,
      );

      if (!selectedOption) {
        throw new BadRequestException(
          `Opción inválida para la pregunta ${question.id}`,
        );
      }

      return {
        questionId: question.id,
        optionId: selectedOption.id,
        value: selectedOption.value,
      };
    });

    const totalScore = answersWithValue.reduce(
      (sum, answer) => sum + answer.value,
      0,
    );
    const interpretation = test.interpretationRanges.find(
      (range) => totalScore >= range.min && totalScore <= range.max,
    );

    if (!interpretation) {
      throw new BadRequestException(
        'No existe rango de interpretación para el puntaje calculado',
      );
    }

    const created = await this.resultModel.create({
      psychologistId,
      patientId: dto.patientId,
      testId: dto.testId,
      answers: answersWithValue,
      totalScore,
      interpretationLabel: interpretation.label,
      interpretationDescription: interpretation.description,
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
}
