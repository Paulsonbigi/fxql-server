import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['id'])
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'date', nullable: true })
  deletedAt?: Date | null;

  @DeleteDateColumn({ name: 'deleted_by', nullable: true, type: 'varchar' })
  deletedBy?: string | null;
}
