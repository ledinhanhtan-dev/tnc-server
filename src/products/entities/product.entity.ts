import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  idName: string;

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

  // @Column()
  // available: boolean;
  @Column()
  rating: number;

  @Column()
  guarantee: number;

  @Column('text', { array: true })
  shortDescriptions: string[];

  @Column()
  available: boolean;
}
