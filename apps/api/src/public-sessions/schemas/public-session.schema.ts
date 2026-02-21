import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Patient } from '../../patients/schemas/patient.schema';
import { TestResult } from '../../results/schemas/test-result.schema';
import { TestDefinition } from '../../tests/schemas/test.schema';
import { User } from '../../users/schemas/user.schema';

export type PublicSessionDocument = HydratedDocument<PublicSession>;

export enum PublicSessionStatus {
  CREATED = 'created',
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  EXPIRED = 'expired',
}

@Schema({ _id: false })
export class PublicSessionAnswer {
  @Prop({ required: true })
  questionId!: string;

  @Prop()
  optionId?: string;

  @Prop()
  textResponse?: string;

  @Prop()
  drawingDataUrl?: string;
}

const PublicSessionAnswerSchema =
  SchemaFactory.createForClass(PublicSessionAnswer);

@Schema({ timestamps: true })
export class PublicSession {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true, index: true })
  psychologistId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Patient.name,
    required: true,
    index: true,
  })
  patientId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: TestDefinition.name, required: true })
  testId!: Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  token!: string;

  @Prop({
    type: String,
    enum: PublicSessionStatus,
    default: PublicSessionStatus.CREATED,
    index: true,
  })
  status!: PublicSessionStatus;

  @Prop({ type: [PublicSessionAnswerSchema], default: [] })
  responses!: PublicSessionAnswer[];

  @Prop({ required: true })
  expiresAt!: Date;

  @Prop()
  startedAt?: Date;

  @Prop()
  submittedAt?: Date;

  @Prop()
  totalScore?: number;

  @Prop({ type: Map, of: Number, default: {} })
  profileScores?: Record<string, number>;

  @Prop()
  interpretationLabel?: string;

  @Prop()
  interpretationDescription?: string;

  @Prop({ type: Types.ObjectId, ref: TestResult.name })
  resultId?: Types.ObjectId;
}

export const PublicSessionSchema = SchemaFactory.createForClass(PublicSession);
PublicSessionSchema.index({ psychologistId: 1, patientId: 1, createdAt: -1 });
