import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Employer } from '../employers/employer.entity';
import { Application } from '../applications/application.entity';

export enum JobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  salaryRange: string;

  @Column()
  experience: string;

  @Column({ type: 'enum', enum: JobType, default: JobType.FULL_TIME })
  type: JobType;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', array: true, default: [] })
  requirements: string[];

  @Column({ type: 'text', array: true, default: [] })
  benefits: string[];

  @Column({ type: 'date' })
  applicationDeadline: string;

  @Column({ default: true })
  isOpen: boolean;

  @ManyToOne(() => Employer, (employer) => employer.jobs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  employer: Employer;

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;
}
