import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;
}
