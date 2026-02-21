import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestDocument = HydratedDocument<TestDefinition>;

@Schema({ _id: false })
export class TestOption {
  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ required: true })
  value!: number;
}

const TestOptionSchema = SchemaFactory.createForClass(TestOption);

@Schema({ _id: false })
export class TestQuestion {
  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ type: [TestOptionSchema], required: true })
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

  @Prop({ type: [TestQuestionSchema], required: true })
  questions!: TestQuestion[];

  @Prop({ type: [InterpretationRangeSchema], required: true })
  interpretationRanges!: InterpretationRange[];

  @Prop({ default: true })
  active!: boolean;
}

export const TestSchema = SchemaFactory.createForClass(TestDefinition);
