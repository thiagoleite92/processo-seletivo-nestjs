import { Public } from '../auth/public.decorator';
import { HealthCheckService } from './../../business/services/healthcheck.service';
import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Public()
  @Get('/')
  uptime() {
    return this.healthCheckService.uptime();
  }
}
