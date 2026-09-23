import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employer } from './employer.entity';
import { CreateEmployerDto } from './dto/create-employer.dto';

@Injectable()
export class EmployersService {
  constructor(
    @InjectRepository(Employer)
    private readonly repo: Repository<Employer>,
  ) {}

  findAll(): Promise<Employer[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Employer> {
    const employer = await this.repo.findOne({
      where: { id },
      relations: ['jobs'],
    });
    if (!employer) throw new NotFoundException('Employer not found');
    return employer;
  }

  create(dto: CreateEmployerDto): Promise<Employer> {
    const employer = this.repo.create(dto);
    return this.repo.save(employer);
  }

  async update(id: string, dto: Partial<CreateEmployerDto>): Promise<Employer> {
    const employer = await this.findOne(id);
    Object.assign(employer, dto);
    return this.repo.save(employer);
  }

  async remove(id: string): Promise<void> {
    const employer = await this.findOne(id);
    await this.repo.remove(employer);
  }
}
