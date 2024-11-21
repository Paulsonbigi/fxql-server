import { BaseEntity } from 'src/libs/db/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'rates' })
export class Rate extends BaseEntity {
  @Column({ name: 'source_currency', nullable: false })
  SourceCurrency: string;

  @Column({ name: 'destination_currency', nullable: false })
  DestinationCurrency: string;

  @Column({ name: 'sell_price', nullable: false })
  SellPrice: string;

  @Column({ name: 'buy_price', nullable: false })
  BuyPrice: string;

  @Column({ name: 'cap_amount', nullable: false })
  CapAmount: string;

  @Column({ default: true, name: 'is_active' })
  isActive?: boolean;
}
