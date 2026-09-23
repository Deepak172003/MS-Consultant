import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  tagline: string;

  @IsString()
  syllabus: string;

  @IsString()
  duration: string;

  @IsString()
  instructor: string;

  @IsNumber()
  price: number;

  @IsString()
  mode: string;
}
