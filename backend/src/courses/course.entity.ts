import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  tagline: string;

  @Column({ type: 'text' })
  syllabus: string;

  @Column()
  duration: string;

  @Column()
  instructor: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  mode: string;

  @CreateDateColumn()
  createdAt: Date;
}
