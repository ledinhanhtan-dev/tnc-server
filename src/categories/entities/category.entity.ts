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

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, type: 'simple-json' })
  description: { title: string; content: string };

  count: number;

  // Relationships

  @OneToMany(() => Product, product => product.category, { cascade: true })
  products: Product[];
}
