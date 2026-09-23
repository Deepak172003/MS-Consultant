import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Job } from '../jobs/job.entity';
import { Candidate } from '../candidates/candidate.entity';

export enum ApplicationStatus {
  APPLIED = 'applied',
  UNDER_REVIEW = 'under_review',
  SHORTLISTED = 'shortlisted',
  REJECTED = 'rejected',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, (job) => job.applications, { onDelete: 'CASCADE' })
  @JoinColumn()
  job: Job;

  @ManyToOne(() => Candidate, (candidate) => candidate.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  candidate: Candidate;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.APPLIED,
  })
  status: ApplicationStatus;

  @CreateDateColumn()
  appliedAt: Date;
}
