import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { ValidaUF } from '../validators/uf.validator';

export class AddressDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  city: string;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  @Validate(ValidaUF, { message: 'Insira uma sigla válida.' })
  uf: string;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  neighborhood: string;
}
