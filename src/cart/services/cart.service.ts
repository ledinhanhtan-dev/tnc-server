import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/product/entities/product.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getNewCart(): Promise<Cart> {
    const newCart = this.cartRepository.create({
      sessionId: uuid(),
      cartItems: [],
    });

    return this.cartRepository.save(newCart);
  }

  async getCart(sessionId: string): Promise<Cart> {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.sessionId = :sessionId', { sessionId })
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product')
      .orderBy('cartItem.createdAt')
      .getOne();

    if (!cart) throw new NotFoundException();

    return cart;
  }

  async addToCart(
    sessionId: string,
    productId: number,
    inputQuantity: number,
  ): Promise<Cart> {
    const cart = await this.getCart(sessionId);

    const index = cart.cartItems.findIndex(
      item => item.product.id === productId,
    );

    if (index === -1) {
      const product = await this.productRepository.findOne(productId);
      const item = this.cartItemRepository.create({
        cart,
        product,
        quantity: inputQuantity,
      });

      const newItem = await this.cartItemRepository.save(item);

      cart.cartItems.push(newItem);
    } else {
      const item = cart.cartItems[index];
      item.quantity = item.quantity + inputQuantity;
      const updatedItem = await this.cartItemRepository.save(item);

      cart.cartItems[index] = updatedItem;
    }

    return cart;
  }

  async editQuantity(
    sessionId: string,
    cartItemId: number,
    expression: 'plus' | 'minus',
  ): Promise<Cart> {
    const item = await this.cartItemRepository.findOne(cartItemId);
    if (expression === 'plus') item.quantity += 1;
    else item.quantity -= 1;

    await this.cartItemRepository.save(item);

    return this.getCart(sessionId);
  }

  async removeFromCart(sessionId: string, cartItemId: number): Promise<Cart> {
    await this.cartItemRepository.delete(cartItemId);
    return this.getCart(sessionId);
  }

  async deleteCart(sessionId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ sessionId });
    this.cartItemRepository.delete({ cart });

    return { ...cart, cartItems: [] };
  }
}
