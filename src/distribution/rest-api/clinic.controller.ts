import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('/clinic')
export class ClinicController {
  @Post()
  create() {
    // sua implementação
  }

  @Get()
  list() {
    // sua implementação
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
