import { JwtAuthGuard } from './../../common/auth/jwt-auth.guard';
import { CreateUserDto } from './../../common/dtos/create-user-dto';
import { UsersService } from './../../business/services/users.service';
import { UserDto } from './../../common/dtos/user-dto';
import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';

import { Public } from '../auth/public.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({ type: UserDto, isArray: true })
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  list() {
    return this.usersService.list();
  }
}
