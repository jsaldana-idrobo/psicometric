import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Recommendation } from '../../common/recommendation.enum';
import { Patient } from '../../patients/schemas/patient.schema';
import { TestDefinition } from '../../tests/schemas/test.schema';
import { User } from '../../users/schemas/user.schema';

export type TestResultDocument = HydratedDocument<TestResult>;

@Schema({ _id: false })
export class AnswerItem {
  @Prop({ required: true })
  questionId!: string;

  @Prop()
  optionId?: string;

  @Prop({ default: 0 })
  value!: number;

  @Prop()
  textResponse?: string;

  @Prop()
  drawingDataUrl?: string;
}

const AnswerItemSchema = SchemaFactory.createForClass(AnswerItem);

@Schema({ timestamps: true })
export class TestResult {
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

  @Prop({ type: [AnswerItemSchema], required: true })
  answers!: AnswerItem[];

  @Prop({ required: true })
  totalScore!: number;

  @Prop({ type: Map, of: Number, default: {} })
  profileScores?: Record<string, number>;

  @Prop({ required: true })
  interpretationLabel!: string;

  @Prop({ required: true })
  interpretationDescription!: string;

  @Prop()
  observations?: string;

  @Prop()
  finalConclusion?: string;

  @Prop({ enum: Recommendation })
  recommendation?: Recommendation;

  @Prop({ required: true })
  evaluatedAt!: Date;

  @Prop({ type: Types.ObjectId })
  sourceSessionId?: Types.ObjectId;
}

export const TestResultSchema = SchemaFactory.createForClass(TestResult);
TestResultSchema.index({ psychologistId: 1, patientId: 1, createdAt: -1 });
