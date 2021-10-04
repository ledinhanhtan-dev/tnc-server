import { Product } from '../entities/product.entity';

export interface HomeProducts {
  discountProducts: Product[];
  newProducts: Product[];
  hotProducts: Product[];
}
