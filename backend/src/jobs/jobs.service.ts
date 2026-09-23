import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { QueryJobsDto } from './dto/query-jobs.dto';
import { Employer } from '../employers/employer.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly repo: Repository<Job>,
    @InjectRepository(Employer)
    private readonly employerRepo: Repository<Employer>,
  ) {}

  async findAll(query: QueryJobsDto): Promise<Job[]> {
    const qb = this.repo
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.employer', 'employer')
      .orderBy('job.createdAt', 'DESC');

    if (query.search) {
      qb.andWhere('(job.title ILIKE :search OR employer.instituteName ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }
    if (query.location) {
      qb.andWhere('job.location ILIKE :location', {
        location: `%${query.location}%`,
      });
    }
    if (query.type) {
      qb.andWhere('job.type = :type', { type: query.type });
    }

    return qb.getMany();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.repo.findOne({
      where: { id },
      relations: ['employer'],
    });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async create(dto: CreateJobDto): Promise<Job> {
    const employer = await this.employerRepo.findOne({
      where: { id: dto.employerId },
    });
    if (!employer) throw new NotFoundException('Employer not found');

    const { employerId, ...rest } = dto;
    const job = this.repo.create({ ...rest, employer });
    return this.repo.save(job);
  }

  async update(id: string, dto: Partial<CreateJobDto>): Promise<Job> {
    const job = await this.findOne(id);
    Object.assign(job, dto);
    return this.repo.save(job);
  }

  async remove(id: string): Promise<void> {
    const job = await this.findOne(id);
    await this.repo.remove(job);
  }
}
