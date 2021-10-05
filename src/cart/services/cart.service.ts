import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';

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

  async getNewCart(): Promise<Cart> {
    const newCart = this.cartsRepository.create({
      sessionId: uuid(),
      cartItems: [],
    });

    return this.cartsRepository.save(newCart);
  }

  async getCart(sessionId: string): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({ sessionId });
    if (!cart) throw new NotFoundException();

    const cartItems = await this.cartItemsRepository.find({
      where: { cart },
      relations: ['product'],
    });

    return { ...cart, cartItems };
  }

  async addToCart(sessionId: string, productId: number): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({ sessionId });
    const product = await this.productsRepository.findOne(productId);
    const cartItem = await this.cartItemsRepository.findOne({ cart, product });

    if (!cartItem)
      await this.cartItemsRepository.save({ cart, product, quantity: 1 });
    else {
      await this.cartItemsRepository.save({
        ...cartItem,
        quantity: cartItem.quantity + 1,
      });
    }

    const cartItems = await this.cartItemsRepository.find({
      where: { cart },
      relations: ['product'],
    });

    return this.cartsRepository.save({ ...cart, cartItems });
  }

  async editQuantity(
    sessionId: string,
    cartItemId: number,
    expression: 'plus' | 'minus',
  ): Promise<Cart> {
    const cartItem = await this.cartItemsRepository.findOne(cartItemId);
    const updatedQuantity =
      expression === 'plus' ? cartItem.quantity + 1 : cartItem.quantity - 1;

    await this.cartItemsRepository.update(
      { id: cartItemId },
      { quantity: updatedQuantity },
    );

    return this.getCart(sessionId);
  }

  async removeFromCart(sessionId: string, cartItemId: number): Promise<Cart> {
    await this.cartItemsRepository.delete(cartItemId);
    return this.getCart(sessionId);
  }

  async deleteCart(sessionId: string): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({ sessionId });
    this.cartItemsRepository.delete({ cart });
    return { ...cart, cartItems: [] };
  }
}
