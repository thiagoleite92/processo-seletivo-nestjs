import { Body, Controller, Delete, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ClinicsService } from 'src/business/services/clinics.service';
import { CreateClinicDto } from 'src/common/dtos/create-clinic-dto';

@Controller('/clinic')
export class ClinicController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicsService.createClinic(createClinicDto);
  }

  @Get()
  list() {
    return this.clinicsService.list();
  }

  @Put()
  update() {
    // sua implementação
  }

  @Delete()
  delete() {
    // sua implementação
  }
}
