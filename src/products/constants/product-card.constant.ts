import { Product } from '../entities/product.entity';

export const PRODUCT_CARD_PROPERTIES = [
  'product.id',
  'product.name',
  'product.slug',
  'product.thumbnail',
  'product.rating',
  'product.priceOld',
  'product.price',
];

export const PRODUCT_CARD_KEYS: (keyof Product)[] = [
  'id',
  'name',
  'slug',
  'thumbnail',
  'rating',
  'price',
  'priceOld',
];
