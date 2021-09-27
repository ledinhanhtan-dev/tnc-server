import { Product } from '../entities/product.entity';

export interface HomeProducts {
  isFetched: boolean;
  discountProducts: Product[];
}
