import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Job } from '../jobs/job.entity';

@Entity('employers')
export class Employer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  instituteName: string;

  @Column()
  contactEmail: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column()
  location: string;

  @Column({ default: false })
  verified: boolean;

  @OneToMany(() => Job, (job) => job.employer)
  jobs: Job[];

  @CreateDateColumn()
  createdAt: Date;
}
