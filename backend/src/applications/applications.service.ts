import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { Job } from '../jobs/job.entity';
import { Candidate } from '../candidates/candidate.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly repo: Repository<Application>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    @InjectRepository(Candidate)
    private readonly candidateRepo: Repository<Candidate>,
  ) {}

  findAll(): Promise<Application[]> {
    return this.repo.find({
      relations: ['job', 'candidate'],
      order: { appliedAt: 'DESC' },
    });
  }

  findByCandidate(candidateId: string): Promise<Application[]> {
    return this.repo.find({
      where: { candidate: { id: candidateId } },
      relations: ['job', 'job.employer'],
      order: { appliedAt: 'DESC' },
    });
  }

  findByJob(jobId: string): Promise<Application[]> {
    return this.repo.find({
      where: { job: { id: jobId } },
      relations: ['candidate'],
      order: { appliedAt: 'DESC' },
    });
  }

  async create(dto: CreateApplicationDto): Promise<Application> {
    const job = await this.jobRepo.findOne({ where: { id: dto.jobId } });
    if (!job) throw new NotFoundException('Job not found');
    const candidate = await this.candidateRepo.findOne({
      where: { id: dto.candidateId },
    });
    if (!candidate) throw new NotFoundException('Candidate not found');

    const application = this.repo.create({ job, candidate });
    return this.repo.save(application);
  }

  async updateStatus(
    id: string,
    dto: UpdateApplicationStatusDto,
  ): Promise<Application> {
    const application = await this.repo.findOne({ where: { id } });
    if (!application) throw new NotFoundException('Application not found');
    application.status = dto.status;
    return this.repo.save(application);
  }
}
