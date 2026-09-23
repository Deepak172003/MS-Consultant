import { IsUUID } from 'class-validator';

export class CreateApplicationDto {
  @IsUUID()
  jobId: string;

  @IsUUID()
  candidateId: string;
}
