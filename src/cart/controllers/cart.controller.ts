import { GetSessionId } from '../decorators/get-session-id.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CalcTotalsInterceptor } from '../interceptors/calc-totals.interceptor';
import { CartService } from '../services/cart.service';
import { Cart } from '../entities/cart.entity';
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

  @Post('/add/:productId')
  addToCart(
    @GetSessionId() sessionId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ): Promise<Cart> {
    console.log(quantity);

    return this.cartService.addToCart(sessionId, +productId, quantity);
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
