import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly repo: Repository<ContactMessage>,
  ) {}

  findAll(): Promise<ContactMessage[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  create(dto: CreateContactMessageDto): Promise<ContactMessage> {
    const message = this.repo.create(dto);
    return this.repo.save(message);
  }
}
