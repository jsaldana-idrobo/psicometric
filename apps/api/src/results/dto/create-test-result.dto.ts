import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Recommendation } from '../../common/recommendation.enum';

class AnswerDto {
  @IsString()
  questionId!: string;

  @IsString()
  optionId!: string;
}

export class CreateTestResultDto {
  @IsString()
  patientId!: string;

  @IsString()
  testId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers!: AnswerDto[];

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsString()
  finalConclusion?: string;

  @IsOptional()
  @IsEnum(Recommendation)
  recommendation?: Recommendation;

  @IsOptional()
  @IsDateString()
  evaluatedAt?: string;
}
