import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true, index: true })
  psychologistId!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  fullName!: string;

  @Prop({ required: true, trim: true })
  documentId!: string;

  @Prop({ required: true })
  dateOfBirth!: Date;

  @Prop({ trim: true })
  phone?: string;

  @Prop({ trim: true, lowercase: true })
  email?: string;

  @Prop({ trim: true })
  company?: string;

  @Prop({ trim: true })
  position?: string;

  @Prop({ required: true })
  evaluationDate!: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
PatientSchema.index({ psychologistId: 1, documentId: 1 }, { unique: true });
