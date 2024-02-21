import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  uptime() {
    const health = {
      message: 'API - OK',
      data: new Date(),
      ISOString: new Date().toISOString(),
      toString: new Date().toString(),
    };

    return health;
  }
}
