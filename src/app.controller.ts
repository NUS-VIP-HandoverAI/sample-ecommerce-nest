import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'nestjs-ecommerce-sample',
      timestamp: new Date().toISOString(),
    };
  }
}
