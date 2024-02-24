import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidCnpj } from '../validators/cnpj.validator';

export class CreateClinicDto {
  @ApiProperty()
  @MinLength(14)
  @IsValidCnpj()
  @Transform(({ value }) => value.replace(/\D+/g, ''))
  cnpj: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  website: string;
}
