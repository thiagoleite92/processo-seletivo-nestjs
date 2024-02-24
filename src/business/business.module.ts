import { DataAccessModule } from './../data-access/data-access.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../common/auth/auth.service';
import { HealthCheckService } from './services/healthcheck.service';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { ClinicsProviders, UsersProviders } from 'src/common/providers';
import { LocalStrategy } from 'src/common/auth/local.strategy';
import { ClinicsService } from './services/clinics.service';

@Module({
  imports: [DataAccessModule],
  providers: [
    HealthCheckService,
    AuthService,
    UsersService,
    JwtService,
    ...UsersProviders,
    LocalStrategy,
    ClinicsService,
    ...ClinicsProviders,
  ],
  exports: [HealthCheckService, AuthService, UsersService, JwtService, ClinicsService],
})
export class BusinessModule {}
