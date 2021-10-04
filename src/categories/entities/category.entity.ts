import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  Index,
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

  // Relationships

  @OneToMany(() => Product, product => product.category, { cascade: true })
  products: Product[];
}
