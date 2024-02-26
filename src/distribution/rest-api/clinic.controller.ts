import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ClinicsService } from 'src/business/services/clinics.service';
import { BaseFilterDTO } from 'src/common/dtos/base-filter-dto';
import { CreateClinicDto } from 'src/common/dtos/create-clinic-dto';

@Controller('/clinic')
export class ClinicController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicDto);
  }

  @Get()
  list(@Query() filter: BaseFilterDTO) {
    console.log(filter);
    return this.clinicsService.list(filter);
  }

  @Get(':id')
  getClinicById(@Param() clinicId: { id: string }) {
    const { id } = clinicId;

    return this.clinicsService.findClinicById(Number(id));
  }

  @Put(':id')
  update(@Param() clinicId: { id: string }, @Body() updateClinicDto: CreateClinicDto) {
    const { id } = clinicId;

    return this.clinicsService.update(Number(id), updateClinicDto);
  }

  @Delete(':id')
  delete(@Param() clinicId: { id: string }) {
    const { id } = clinicId;

    return this.clinicsService.delete(Number(id));
  }
}
