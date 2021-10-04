import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { stringHelper } from 'src/helpers/stringHelper.helper';
import { CreateProductDto } from '../dto/create-product.dto';
import { HomeProducts } from '../interfaces';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { PRODUCT_CARD_PROPERTIES } from '../constants';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async getHomeProducts(): Promise<HomeProducts> {
    const discountProducts = await this.productsRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .where('product.priceOld > 0')
      .orderBy('"createdAt"')
      .limit(10)
      .getMany();

    const newProducts = await this.productsRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .orderBy('"createdAt"')
      .limit(10)
      .getMany();

    const hotProducts = await this.productsRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .orderBy('"createdAt"')
      .limit(10)
      .getMany();

    return { discountProducts, newProducts, hotProducts };
  }

  async getProduct(slug: string): Promise<Product> {
    const product = await this.productsRepository.findOne(
      { slug },
      { relations: ['category', 'brand'] },
    );
    if (!product) throw new NotFoundException();
    return product;
  }

  async getProductByCategory(categoryId: string): Promise<Product[]> {
    return this.productsRepository
      .createQueryBuilder('product')
      .select()
      .where('product.category.id = :categoryId', { categoryId })
      .limit(10)
      .getMany();
  }

  async getProductsByBrand(brandId: string): Promise<Product[]> {
    return this.productsRepository
      .createQueryBuilder('product')
      .select()
      .where('product.brand.id = :brandId', { brandId })
      .limit(10)
      .getMany();
  }

  async createProduct(createDto: CreateProductDto): Promise<Product> {
    const { categorySlug, brandSlug, ...dto } = createDto;

    const category = await this.categoriesRepository.findOne({
      slug: categorySlug,
    });
    const brand = await this.brandsRepository.findOne({ slug: brandSlug });

    const newProduct = this.productsRepository.create({
      ...dto,
      slug: stringHelper.generateSlug(dto.name),
      category,
      brand,
    });

    return this.productsRepository.save(newProduct);
  }

  // async updateProduct(id: string, updateProductDto: UpdateProductDto) {
  //   const product = await this.getProduct(id);
  //   return this.productsRepository.save({ ...product, ...updateProductDto });
  // }
}
