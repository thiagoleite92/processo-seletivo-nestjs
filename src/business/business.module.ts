import { DataAccessModule } from './../data-access/data-access.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../common/auth/auth.service';
import { HealthCheckService } from './services/healthcheck.service';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersProviders } from 'src/common/providers';
import { LocalStrategy } from 'src/common/auth/local.strategy';

@Module({
  imports: [DataAccessModule],
  providers: [HealthCheckService, AuthService, UsersService, JwtService, ...UsersProviders, LocalStrategy],
  exports: [HealthCheckService, AuthService, UsersService, JwtService],
})
export class BusinessModule {}
