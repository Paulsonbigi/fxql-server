import { Controller, Get, SerializeOptions } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @SkipThrottle()
  @SerializeOptions({ strategy: 'exposeAll' })
  health() {
    return this.appService.health();
  }
}
