import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getFeaturedProducts } from '../constants/stores.constant';
import { Store } from '../entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async getStore(slug: string): Promise<Store> {
    const brandSlug = slug.split('-')[0];

    const store = await this.storeRepository
      .createQueryBuilder('store')
      .where('store.slug = :slug', { slug })
      .leftJoinAndSelect('store.categories', 'category')
      .leftJoinAndSelect('category.products', 'product')
      .leftJoinAndSelect('product.brand', 'brand')
      .andWhere('brand.slug = :brandSlug', { brandSlug })
      .getOne();

    store.featuredProducts = getFeaturedProducts(slug);

    return store;
  }
}
