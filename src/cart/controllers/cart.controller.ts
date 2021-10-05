import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { GetSessionId } from '../decorators/get-session-id.decorator';
import { Cart } from '../entities/cart.entity';
import { CalcTotalsInterceptor } from '../interceptors/calc-totals.interceptor';
import { CartService } from '../services/cart.service';
@UseInterceptors(CalcTotalsInterceptor)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('')
  getCartData(@GetSessionId() sessionId: string): Promise<Cart> {
    return this.cartService.getCart(sessionId);
  }

  @Get('/new')
  getNewCart(): Promise<Cart> {
    return this.cartService.getNewCart();
  }

  @Get('/add/:productId')
  addToCart(
    @GetSessionId() sessionId: string,
    @Param('productId') productId: string,
  ): Promise<Cart> {
    return this.cartService.addToCart(sessionId, +productId);
  }

  @Get('/plus/:itemId')
  increaseQuantity(
    @GetSessionId() sessionId: string,
    @Param('itemId') itemId: string,
  ): Promise<Cart> {
    return this.cartService.editQuantity(sessionId, +itemId, 'plus');
  }

  @Get('/minus/:itemId')
  decreaseQuantity(
    @GetSessionId() sessionId: string,
    @Param('itemId') itemId: string,
  ): Promise<Cart> {
    return this.cartService.editQuantity(sessionId, +itemId, 'minus');
  }

  @Get('/remove/:itemId')
  removeFromCart(
    @GetSessionId() sessionId: string,
    @Param('itemId') itemId: string,
  ): Promise<Cart> {
    return this.cartService.removeFromCart(sessionId, +itemId);
  }

  @Get('/delete')
  deleteCart(@GetSessionId() sessionId: string): Promise<Cart> {
    return this.cartService.deleteCart(sessionId);
  }
}
