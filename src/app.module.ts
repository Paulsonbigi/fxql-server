import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalConfig, GlobalConfigValidationSchema } from './libs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './libs/db';
import { RateModule } from './rate/rate.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './libs/utils/exceptions';
import { CustomThrottlerGuard } from './libs/utils/pipe/rate-limiter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: GlobalConfigValidationSchema,
      load: [GlobalConfig],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const { ttl, limit } = config.get('security.throttler');
        console.log('ttl, limit', ttl, limit);
        return [
          {
            ttl: 60000,
            limit: 2,
          },
        ];
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
    RateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useFactory: (config: ConfigService) => {
        return new GlobalExceptionFilter(config);
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    }
  ],
})
export class AppModule {}
