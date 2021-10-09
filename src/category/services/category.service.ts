import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { PRODUCT_CARD_PROPERTIES } from 'src/product/constants/product-card.constant';
import { CategoryQueryDto } from '../dto/category-query.dto';
import { PAGE_SIZE } from '../constants/category.constant';
import { Category } from '../entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getCategoryInitial(slug: string): Promise<Category> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.slug = :slug', { slug })
      .leftJoinAndSelect('category.filters', 'filter')
      .leftJoinAndSelect('filter.tags', 'tag')
      .getOne();

    const result = await this.productRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .where('product.categoryId = :categoryId', { categoryId: category.id })
      .limit(PAGE_SIZE)
      .orderBy('price', 'ASC')
      .getManyAndCount();

    const [products, count] = result;
    category.products = products;
    category.count = count;

    return category;
  }

  async getCategory(
    slug: string,
    catQueryDto: CategoryQueryDto,
  ): Promise<Category> {
    const { sort, order, currentPage } = catQueryDto;

    const category = await this.categoryRepository.findOne({ slug });
    const result = await this.productRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .where('product.categoryId = :categoryId', { categoryId: category.id })
      .offset((currentPage - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .orderBy(`product."${sort}"`, order)
      .getManyAndCount();

    const [products, count] = result;
    category.products = products;
    category.count = count;

    return category;
  }

  async getFilteredCategory(
    slug: string,
    catQueryDto: CategoryQueryDto,
    filters: Tag[],
  ): Promise<Category> {
    const { sort, order, currentPage } = catQueryDto;
    const tagIds = filters.map(tag => tag.id);

    const category = await this.categoryRepository.findOne({ slug });
    const result = await this.productRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .leftJoinAndSelect('product.tags', 'tag')
      .where('product.category.id = :categoryId', { categoryId: category.id })
      .andWhere('tag.id IN(:...tagIds)', { tagIds }) /////////////////// Filtered by tags
      .offset((currentPage - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .orderBy(`product."${sort}"`, order)
      .getManyAndCount();

    const [products, count] = result;
    category.products = products;
    category.count = count;

    return category;
  }
}
