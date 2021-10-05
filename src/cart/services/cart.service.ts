import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartsRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemsRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getCart(sessionId: string): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({ sessionId });

    if (!cart) throw new NotFoundException();

    cart.cartItems = await this.cartItemsRepository
      .createQueryBuilder('cartItem')
      .leftJoinAndSelect('cartItem.product', 'product')
      .where('cartItem.cartId = :cartId', { cartId: cart.id })
      .getMany();

    cart.cartItems.forEach(item => {
      cart.totalQuantity += item.quantity;
      cart.totalPrice += item.quantity * item.product.price;
    });

    return cart;
  }

  async getNewCart(): Promise<Cart> {
    const newCart = this.cartsRepository.create({
      sessionId: uuid(),
      totalPrice: 0,
      totalQuantity: 0,
      cartItems: [],
    });

    return this.cartsRepository.save(newCart);
  }
}
