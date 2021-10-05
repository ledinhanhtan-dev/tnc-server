import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sessionId: string;

  @Column()
  totalPrice: number;

  @Column()
  totalQuantity: number;

  @OneToMany(() => CartItem, cartItem => cartItem.id)
  cartItems: CartItem[];
}
