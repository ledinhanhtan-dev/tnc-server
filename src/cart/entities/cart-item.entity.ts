import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  // FIX: cartIdId
  @ManyToOne(() => Cart, cart => cart.cartItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart: Cart;

  @ManyToOne(() => Product, product => product.cartItems)
  product: Product;
}
