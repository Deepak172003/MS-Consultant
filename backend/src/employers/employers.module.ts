import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './employer.entity';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employer])],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [EmployersService],
})
export class EmployersModule {}
