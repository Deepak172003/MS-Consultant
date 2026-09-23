import { IsOptional, IsString } from 'class-validator';

export class QueryJobsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  type?: string;
}
