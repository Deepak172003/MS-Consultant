import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  subjectSpecialisation?: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;
}
