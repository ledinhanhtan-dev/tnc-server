import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getFeaturedProducts } from '../constants/stores.constant';
import { Store } from '../entities/store.entity';

const msi: Store = {
  id: 1,
  name: 'MSI Official Store',
  slug: 'msi-official-store',
  banner: 'http://localhost:3000/image/banner/store-msi-banner.jpg',
  featuredProducts: [
    {
      image: 'http://localhost:3000/image/banner/store-msi-featured-1.jpg',
      slug: '',
    },
    {
      image: 'http://localhost:3000/image/banner/store-msi-featured-2.png',
      slug: '',
    },
    {
      image: 'http://localhost:3000/image/banner/store-msi-featured-3.png',
      slug: '',
    },
    {
      image: 'http://localhost:3000/image/banner/store-msi-featured-4.png',
      slug: '',
    },
    {
      image: 'http://localhost:3000/image/banner/store-msi-featured-5.png',
      slug: '',
    },
  ],
  categories: [],
};

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
