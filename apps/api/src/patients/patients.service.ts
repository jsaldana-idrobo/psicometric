import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { calculateAge } from '../common/age.util';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient, PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}

  async create(psychologistId: string, dto: CreatePatientDto) {
    try {
      const created = await this.patientModel.create({
        ...dto,
        dateOfBirth: new Date(dto.dateOfBirth),
        evaluationDate: new Date(dto.evaluationDate),
        psychologistId,
      });

      return this.toResponse(created);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new BadRequestException(
          'Ya existe un paciente con ese documento',
        );
      }
      throw error;
    }
  }

  async findAll(psychologistId: string) {
    const patients = await this.patientModel
      .find({ psychologistId })
      .sort({ evaluationDate: -1, createdAt: -1 })
      .exec();

    return patients.map((patient) => this.toResponse(patient));
  }

  async findOne(psychologistId: string, patientId: string) {
    const patient = await this.patientModel
      .findOne({ _id: patientId, psychologistId })
      .exec();

    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return this.toResponse(patient);
  }

  async update(
    psychologistId: string,
    patientId: string,
    dto: UpdatePatientDto,
  ) {
    const updatePayload = {
      ...dto,
      ...(dto.dateOfBirth ? { dateOfBirth: new Date(dto.dateOfBirth) } : {}),
      ...(dto.evaluationDate
        ? { evaluationDate: new Date(dto.evaluationDate) }
        : {}),
    };

    const updated = await this.patientModel
      .findOneAndUpdate({ _id: patientId, psychologistId }, updatePayload, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updated) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return this.toResponse(updated);
  }

  async remove(psychologistId: string, patientId: string) {
    const deleted = await this.patientModel
      .findOneAndDelete({ _id: patientId, psychologistId })
      .exec();

    if (!deleted) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return { success: true };
  }

  private toResponse(patient: PatientDocument) {
    return {
      id: patient.id,
      fullName: patient.fullName,
      documentId: patient.documentId,
      dateOfBirth: patient.dateOfBirth,
      age: calculateAge(patient.dateOfBirth),
      phone: patient.phone,
      email: patient.email,
      company: patient.company,
      position: patient.position,
      evaluationDate: patient.evaluationDate,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    };
  }
}
