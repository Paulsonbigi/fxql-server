import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Rate } from '../entities/rate.entity';

export class DocCreateRateDto {
  @ApiProperty({
    description: `Foreign Exchange Query Language (FXQL) string containing details about currency rates. 
          - Format: "{SourceCurrency-DestinationCurrency {\\n KEY VALUE\\n ... }}"
          - Keys:
              - BUY: The buy rate for the currency pair.
              - SELL: The sell rate for the currency pair.
              - CAP: The cap amount for the currency rate.
          - Example:
              "USD-EUR {\\n BUY 100\\n SELL 200\\n CAP 93800\\n}"
          - Multiple entries can be separated by double newlines (\\n\\n).`,
    example:
      'USD-EUR {\\n BUY 100\\n SELL 200\\n CAP 93800\\n}\\n\\nGBP-JPY {\\n BUY 145.20\\n SELL 146.50\\n CAP 50000\\n}',
    type: String,
  })
  FXQL: string;
}

export class CreateRateDto {
  @ApiProperty({
    description: 'Buy amount',
    example: 9,
  })
  BUY: string;
  @ApiProperty({
    description: 'Sell amount',
    example: 20,
  })
  SELL: string;
  @ApiProperty({
    description: 'CAP price',
    example: 120,
  })
  CapAmount: string;
  @ApiProperty({
    description: 'Source currency',
    example: 'USD',
  })
  SourceCurrency: string;
  @ApiProperty({
    description: 'Destination currency',
    example: 'NGN',
  })
  DestinationCurrency: string;
}

export class GetRateResponseDto {
  constructor(
    partial: Partial<Rate> & {
      wallets?: any[];
    },
  ) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  SourceCurrency: string;

  @Expose()
  DestinationCurrency: string;

  @Expose()
  SellPrice: number;

  @Expose()
  BuyPrice: number;

  @Expose()
  CapAmount: number;
}
