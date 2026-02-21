import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Recommendation } from '../../common/recommendation.enum';

export class UpdateResultNotesDto {
  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsString()
  finalConclusion?: string;

  @IsOptional()
  @IsEnum(Recommendation)
  recommendation?: Recommendation;
}
