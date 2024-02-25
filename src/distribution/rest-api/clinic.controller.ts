import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ClinicsService } from 'src/business/services/clinics.service';
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
  list() {
    return this.clinicsService.list();
  }

  @Put(':id')
  update(@Param() clinicId: { id: string }, @Body() updateClinicDto: CreateClinicDto) {
    const { id } = clinicId;

    return this.clinicsService.updateClinic(Number(id), updateClinicDto);
  }

  @Delete()
  delete() {
    // sua implementação
  }
}
