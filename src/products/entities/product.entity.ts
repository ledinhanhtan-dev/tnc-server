import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number;

  @Column()
  brand_id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  price: number;

  @Column()
  price_old: number;

  @Column()
  thumbnail: string;

  @Column()
  images: string;

  @Column()
  short_desc: string;

  @Column()
  rating_score: number;

  @Column()
  rating_count: number;

  @Column()
  guarantee: number;

  @Column()
  in_stock: boolean;
}
