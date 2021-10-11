import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

interface FeaturedProduct {
  image: string;
  slug: string;
}

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  banner: string;

  featuredProducts: FeaturedProduct[];

  @ManyToMany(() => Category, category => category.stores)
  @JoinTable()
  categories: Category[];
}
