import { PartialType } from '@nestjs/mapped-types';
import { CreateRateDto } from './rate.dto';

export class UpdateRateDto extends PartialType(CreateRateDto) {}
