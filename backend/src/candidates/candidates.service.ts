import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly repo: Repository<Candidate>,
  ) {}

  findAll(): Promise<Candidate[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Candidate> {
    const candidate = await this.repo.findOne({
      where: { id },
      relations: ['applications', 'applications.job'],
    });
    if (!candidate) throw new NotFoundException('Candidate not found');
    return candidate;
  }

  create(dto: CreateCandidateDto): Promise<Candidate> {
    const candidate = this.repo.create(dto);
    return this.repo.save(candidate);
  }

  async update(id: string, dto: Partial<CreateCandidateDto>): Promise<Candidate> {
    const candidate = await this.findOne(id);
    Object.assign(candidate, dto);
    return this.repo.save(candidate);
  }

  async remove(id: string): Promise<void> {
    const candidate = await this.findOne(id);
    await this.repo.remove(candidate);
  }
}
