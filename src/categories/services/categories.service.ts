import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { PRODUCT_CARD_KEYS } from 'src/products/constants/product-card.constant';
import { PAGE_SIZE } from '../constants/cat-pagination.constant';
import { CategoryQueryDto } from '../dto/category-query.dto';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getCategories(
    slug: string,
    catQueryDto: CategoryQueryDto,
  ): Promise<Category> {
    const { sort, order, currentPage } = catQueryDto;

    const category = await this.categoriesRepository.findOne({ slug });
    const result = await this.productsRepository.findAndCount({
      where: { category },
      select: PRODUCT_CARD_KEYS,
      skip: (currentPage - 1) * PAGE_SIZE,
      order: { [sort]: order },
      take: PAGE_SIZE,
    });

    category.products = result[0];
    category.count = result[1];

    return category;
  }
}
