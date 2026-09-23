import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly repo: Repository<Course>,
  ) {}

  findAll(category?: string): Promise<Course[]> {
    return this.repo.find({
      where: category ? { category } : {},
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.repo.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  create(dto: CreateCourseDto): Promise<Course> {
    const course = this.repo.create(dto);
    return this.repo.save(course);
  }

  async update(id: string, dto: Partial<CreateCourseDto>): Promise<Course> {
    const course = await this.findOne(id);
    Object.assign(course, dto);
    return this.repo.save(course);
  }

  async remove(id: string): Promise<void> {
    const course = await this.findOne(id);
    await this.repo.remove(course);
  }
}
