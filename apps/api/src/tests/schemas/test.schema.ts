import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestDocument = HydratedDocument<TestDefinition>;

export enum QuestionType {
  SINGLE_CHOICE = 'single_choice',
  TEXT = 'text',
  DRAWING = 'drawing',
}

export enum TestScoringMode {
  RANGE = 'range',
  PROFILE = 'profile',
  MANUAL = 'manual',
}

@Schema({ _id: false })
export class TestOption {
  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ default: 0 })
  value!: number;

  @Prop({ type: Map, of: Number, default: {} })
  profileScores?: Record<string, number>;
}

const TestOptionSchema = SchemaFactory.createForClass(TestOption);

@Schema({ _id: false })
export class TestQuestion {
  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({
    type: String,
    enum: QuestionType,
    default: QuestionType.SINGLE_CHOICE,
  })
  type!: QuestionType;

  @Prop({ default: true })
  required?: boolean;

  @Prop({ type: [TestOptionSchema], default: [] })
  options!: TestOption[];
}

const TestQuestionSchema = SchemaFactory.createForClass(TestQuestion);

@Schema({ _id: false })
export class InterpretationRange {
  @Prop({ required: true })
  min!: number;

  @Prop({ required: true })
  max!: number;

  @Prop({ required: true })
  label!: string;

  @Prop({ required: true })
  description!: string;
}

const InterpretationRangeSchema =
  SchemaFactory.createForClass(InterpretationRange);

@Schema({ timestamps: true })
export class TestDefinition {
  @Prop({ required: true, unique: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  category!: string;

  @Prop({ required: true, trim: true })
  description!: string;

  @Prop({ trim: true })
  instructions?: string;

  @Prop({ type: [TestQuestionSchema], required: true })
  questions!: TestQuestion[];

  @Prop({ type: [InterpretationRangeSchema], default: [] })
  interpretationRanges!: InterpretationRange[];

  @Prop({
    type: String,
    enum: TestScoringMode,
    default: TestScoringMode.RANGE,
  })
  scoringMode!: TestScoringMode;

  @Prop({ type: Map, of: String, default: {} })
  profileLabels?: Record<string, string>;

  @Prop({ default: true })
  active!: boolean;
}

export const TestSchema = SchemaFactory.createForClass(TestDefinition);
