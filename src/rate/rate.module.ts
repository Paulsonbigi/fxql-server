import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { Rate } from './entities/rate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RateController],
  providers: [RateService],
  imports: [TypeOrmModule.forFeature([Rate])],
})
export class RateModule {}
