import { Injectable } from '@nestjs/common';
import { discountProducts } from './entities/product.entity';
import { HomeProducts } from './interfaces/home-products';

@Injectable()
export class ProductsService {
  getHomeProducts(): HomeProducts {
    return { isFetched: true, discountProducts };
  }
}
