import { Transform, Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidCnpj } from '../validators/cnpj.validator';
import { AddressDto } from './address-dto';

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

  @ValidateNested({ each: true, message: 'O endereço precisa ter: cep, estado, cidade, bairro e rua, número é opcional' })
  @Type(() => AddressDto)
  address: AddressDto;

  addressId: number;
}
