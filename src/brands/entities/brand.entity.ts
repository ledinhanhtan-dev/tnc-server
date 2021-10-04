import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @Column()
  image: string;

  // Relationships

  @OneToMany(() => Product, product => product.brand, { cascade: true })
  products: Product[];
}
