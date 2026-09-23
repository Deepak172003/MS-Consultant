import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Get()
  findAll(
    @Query('candidateId') candidateId?: string,
    @Query('jobId') jobId?: string,
  ) {
    if (candidateId) return this.service.findByCandidate(candidateId);
    if (jobId) return this.service.findByJob(jobId);
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateApplicationDto) {
    return this.service.create(dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
  }
}
