import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PublicSessionAnswerDto {
  @IsString()
  questionId!: string;

  @IsOptional()
  @IsString()
  optionId?: string;

  @IsOptional()
  @IsString()
  textResponse?: string;

  @IsOptional()
  @IsString()
  drawingDataUrl?: string;
}

export class SavePublicSessionDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PublicSessionAnswerDto)
  answers!: PublicSessionAnswerDto[];
}

export class SubmitPublicSessionDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PublicSessionAnswerDto)
  answers?: PublicSessionAnswerDto[];
}
