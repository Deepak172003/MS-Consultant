import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateEmployerDto {
  @IsString()
  instituteName: string;

  @IsEmail()
  contactEmail: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}
