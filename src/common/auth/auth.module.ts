import { DataAccessModule } from './../../data-access/data-access.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersProviders } from '../providers';

@Module({
  imports: [PassportModule, JwtModule, DataAccessModule],
  providers: [...UsersProviders, AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
