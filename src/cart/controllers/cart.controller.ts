import { Controller, Get } from '@nestjs/common';
import { GetSessionId } from '../decorators/get-session-id.decorator';
import { Cart } from '../entities/cart.entity';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/new')
  getNewCart(): Promise<Cart> {
    return this.cartService.getNewCart();
  }

  @Get('')
  getCartData(@GetSessionId() sessionId: string): Promise<Cart> {
    return this.cartService.getCart(sessionId);
  }
}
