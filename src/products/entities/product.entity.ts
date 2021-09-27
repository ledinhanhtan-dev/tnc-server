import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  oldPrice: number;

  @Column()
  thumbnail: string;

  @Column()
  link: string;

  // @Column()
  // images: string[];

  // @Column()
  // description: string;

  // @Column()
  // available: boolean;

  // @Column()
  // insurance: number;

  @Column()
  rating: number;
}

export const discountProducts: Product[] = [
  {
    id: 'p1',
    thumbnail:
      'http://localhost:3000/image/product/card-man-hinh-asus-dual-geforce-rtx3060-ti-v2-edition-1-228x228.jpg',
    name: 'Card Màn Hình Asus Dual GeForce RTX3060 Ti V2 Edition (LHR)',
    link: '#',
    rating: 3,
    price: 20900000,
    oldPrice: 21290000,
  },
  {
    id: 'p2',
    thumbnail:
      'http://localhost:3000/image/product/card-man-hinh-msi-radeon-rx-6600-xt-mech-8g-ocv1-1-228x228.png',
    name: 'Card Màn Hình MSI Radeon RX 6600 XT MECH 2X 8G OCV1',
    link: '#',
    rating: 4,
    price: 15390000,
    oldPrice: 16490000,
  },
  {
    id: 'p4',
    thumbnail:
      'http://localhost:3000/image/product/card-man-hinh-galax-gtx-1650-1click-oc-1-228x228.jpg',
    name: 'Card Màn Hình Galax Geforce GTX 1650 EX (1-Click OC) GDDR6',
    link: '#',
    rating: 3,
    price: 6590000,
    oldPrice: 6920000,
  },
  {
    id: 'p3',
    thumbnail:
      'http://localhost:3000/image/product/card-man-hinh-msi-geforce-rtx-3060-ti-gaming-x-8g-1-228x228.jpg',
    name: 'Card Màn Hình MSI Geforce RTX 3060 Ti GAMING X 8G (LHR)',
    link: '#',
    rating: 3,
    price: 22490000,
    oldPrice: 22790000,
  },
];
