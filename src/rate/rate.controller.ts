import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RateService } from './rate.service';
import {
  CreateRateDto,
  DocCreateRateDto,
  GetRateResponseDto,
} from './dto/rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { ObjectValidationPipe } from 'src/libs/utils/pipe/validation.pipe';
import { createRateValidator } from './validator/rate.validator';
import { Response } from 'src/libs/utils/response';
import { plainToClass } from 'class-transformer';
import { ApiBody } from '@nestjs/swagger';

@Controller('v1/rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  @ApiBody({ type: DocCreateRateDto })
  async create(
    @Body(new ObjectValidationPipe(createRateValidator))
    data: CreateRateDto[],
  ) {
    console.log('data...', data);
    const rates = await this.rateService.create(data);

    const response = plainToClass(GetRateResponseDto, rates, {
      excludeExtraneousValues: true,
    });

    return Response.success(
      rates.length === 1
        ? 'Rates Parsed Successfully.'
        : 'FXQL Statement Parsed Successfully.',
      response,
    );
  }

  @Get()
  findAll() {
    return this.rateService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
    return this.rateService.update(+id, updateRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rateService.remove(+id);
  }
}
