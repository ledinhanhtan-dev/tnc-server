import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, cart => cart.cartItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cartId: number;

  @ManyToOne(() => Product, product => product.id)
  product: Product;
}
