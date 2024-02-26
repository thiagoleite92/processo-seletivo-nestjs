import { IsOptional } from 'class-validator';

export class BaseFilterDTO {
  @IsOptional()
  perPage? = 10;

  @IsOptional()
  page? = 1;

  @IsOptional()
  search?: string = '';

  @IsOptional()
  where? = {};

  @IsOptional()
  orderBy? = null;
}
