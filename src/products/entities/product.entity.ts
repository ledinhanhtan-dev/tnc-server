import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  priceOld: number;

  @Column()
  thumbnail: string;

  @Column('text', { array: true })
  images: string[];

  @Column()
  link: string;

  @Column()
  ratingScore: number;

  @Column()
  ratingCount: number;

  @Column()
  guarantee: number;

  @Column('text', { array: true })
  shortDescriptions: string[];

  @Column()
  available: boolean;
}
