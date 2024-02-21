import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { IsValidCPF } from '../validators/cpf.validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @MinLength(11)
  @IsValidCPF()
  @Transform(({ value }) => value.replace(/\D+/g, ''))
  cpf: string;

  @ApiProperty()
  @IsString()
  password: string;
}
