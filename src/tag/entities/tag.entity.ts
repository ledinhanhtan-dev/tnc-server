import { Filter } from 'src/filter/entities/filter.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Filter, filter => filter.tags)
  @JoinColumn({ name: 'filterId' })
  filter: Filter;

  @ManyToMany(() => Product, product => product.tags)
  products: Product[];
}
