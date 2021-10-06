import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CalcTotalsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((cart: Cart) => {
        const { totalPrice, totalQuantity } = this.calcTotals(cart);
        cart.totalQuantity = totalQuantity;
        cart.totalPrice = totalPrice;

        return cart;
      }),
    );
  }

  private calcTotals(cart: Cart) {
    let totalPrice = 0;
    let totalQuantity = 0;
    cart.cartItems.forEach(item => {
      totalPrice += item.quantity * item.product.price;
      totalQuantity += item.quantity;
    });

    return { totalPrice, totalQuantity };
  }
}
