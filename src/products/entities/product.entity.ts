import { Brand } from 'src/brands/entities/brand.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  priceOld: number;

  @Column()
  thumbnail: string;

  @Column({ type: 'simple-array' })
  images: string[];

  @Column({ type: 'simple-array', default: [] })
  shortDesc: string[];

  @Column({
    type: 'simple-json',
    nullable: true,
    default: { score: 0, count: 0 },
  })
  rating: {
    score: number;
    count: number;
  };

  @Column({ default: 36 })
  guarantee: number;

  @Column()
  inStock: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships

  @ManyToOne(() => Category, category => category.products, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Brand, brand => brand.products, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => CartItem, cartItem => cartItem.id)
  @JoinTable()
  cartItems: CartItem[];
}
