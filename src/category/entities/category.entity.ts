import { Filter } from 'src/filter/entities/filter.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, type: 'simple-json' })
  description: { title: string; text: string };

  count: number;

  // Relationships

  @OneToMany(() => Product, product => product.category, { cascade: true })
  products: Product[];

  @OneToMany(() => Filter, filter => filter.category)
  filters: Filter[];
}
