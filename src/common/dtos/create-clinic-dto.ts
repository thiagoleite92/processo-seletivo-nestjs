import { Transform, Type } from 'class-transformer';
import { IsString, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidCnpj } from '../validators/cnpj.validator';
import { CreateAddressDTO } from './create-address-dto';

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
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  ownerName: string;

  @ValidateNested({ each: true, message: 'O endereço precisa ter: cep, estado, cidade, bairro e rua, número é opcional' })
  @Type(() => CreateAddressDTO)
  address: CreateAddressDTO;

  addressId: number;
}
