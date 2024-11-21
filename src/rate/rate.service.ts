import { Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { Rate } from './entities/rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}
  async create(createRateDtos: CreateRateDto[]): Promise<Rate[]> {
    const newRates = [];

    for (const createRateDto of createRateDtos) {
      const { SourceCurrency, DestinationCurrency, BUY, SELL, CapAmount } =
        createRateDto;

      // Check if the rate already exists
      const rateExists = await this.findOne({
        where: {
          SourceCurrency: Equal(SourceCurrency),
          DestinationCurrency: Equal(DestinationCurrency),
        },
      });

      if (rateExists) {
        // Update the existing rate
        await this.rateRepository.update(rateExists.id, {
          BuyPrice: BUY,
          SellPrice: SELL,
          CapAmount,
        });

        // Retrieve the updated rate
        const updatedRate = await this.findOne({
          where: { id: rateExists.id },
        });
        if (updatedRate) {
          newRates.push(updatedRate);
        }
      } else {
        // Create and persist a new rate
        const newRate = this.rateRepository.create({
          BuyPrice: BUY,
          SellPrice: SELL,
          CapAmount,
          SourceCurrency,
          DestinationCurrency,
        });

        const savedRate = await this.rateRepository.save(newRate);
        newRates.push(savedRate);
      }
    }

    // Return all updated and newly created rates
    return newRates;
  }

  async findOne(options: FindOneOptions): Promise<Rate | null> {
    return await this.rateRepository.findOne(options);
  }

  findAll() {
    return `This action returns all rate`;
  }

  update(id: number, updateRateDto: UpdateRateDto) {
    return `This action updates a #${id} rate`;
  }

  remove(id: number) {
    return `This action removes a #${id} rate`;
  }
}
