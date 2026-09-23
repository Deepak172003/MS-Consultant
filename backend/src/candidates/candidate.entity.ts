import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Application } from '../applications/application.entity';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  subjectSpecialisation: string;

  @Column({ nullable: true })
  resumeUrl: string;

  @OneToMany(() => Application, (application) => application.candidate)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;
}
