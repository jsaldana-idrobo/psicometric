import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePublicSessionDto {
  @IsString()
  patientId!: string;

  @IsString()
  testId!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(30)
  expiresInDays?: number;
}
