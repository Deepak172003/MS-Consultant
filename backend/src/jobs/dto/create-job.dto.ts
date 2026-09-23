import {
  IsString,
  IsEnum,
  IsArray,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { JobType } from '../job.entity';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsString()
  salaryRange: string;

  @IsString()
  experience: string;

  @IsEnum(JobType)
  type: JobType;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @IsString()
  applicationDeadline: string;

  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;

  @IsUUID()
  employerId: string;
}
