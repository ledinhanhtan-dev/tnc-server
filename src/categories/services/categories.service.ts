import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PRODUCT_CARD_PROPERTIES } from 'src/products/constants';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getCategories(slug: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ slug });
    const products = await this.productsRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .where('product.category.id = :categoryId', { categoryId: category.id })
      .orderBy('price')
      .getMany();

    category.count = products.length;
    category.products = products;

    return category;
  }
}
