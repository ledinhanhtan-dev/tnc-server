import { Brand } from 'src/brand/entities/brand.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Brand, brand => brand.products, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @OneToMany(() => CartItem, cartItem => cartItem.product)
  @JoinTable()
  cartItems: CartItem[];

  @ManyToMany(() => Tag, tag => tag.products)
  @JoinTable()
  tags: Tag[];
}
