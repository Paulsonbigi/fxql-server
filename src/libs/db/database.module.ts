import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from 'src/rate/entities/rate.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          url: config.get('typeorm.url'),
          entities: [Rate],
          logging: config.get('typeorm.logging'),
          ssl: config.get('typeorm.ssl'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
