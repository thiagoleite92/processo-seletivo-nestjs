import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { IsValidCPF } from '../validators/cpf.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @MinLength(11)
  @IsValidCPF()
  @Transform(({ value }) => value.replace(/\D+/g, ''))
  cpf: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @Transform(({ value }) => value.replace(/\D+/g, ''))
  phoneNumber: string;
}
