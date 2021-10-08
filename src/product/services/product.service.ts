import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PRODUCT_CARD_PROPERTIES } from '../constants/product-card.constant';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/category/entities/category.entity';
import { stringHelper } from 'src/helpers/stringHelper.helper';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Brand } from 'src/brand/entities/brand.entity';
import { Product } from '../entities/product.entity';
import { HomeProducts } from '../interfaces';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getHomeProducts(): Promise<HomeProducts> {
    const discountProducts = await this.productRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .where('product.priceOld > 0')
      .orderBy('"createdAt"')
      .limit(10)
      .getMany();

    const newProducts = await this.productRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .orderBy('"createdAt"')
      .limit(10)
      .getMany();

    const hotProducts = await this.productRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .orderBy('"createdAt"')
      .limit(10)
      .getMany();

    return { discountProducts, newProducts, hotProducts };
  }

  async getProduct(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne(
      { slug },
      { relations: ['category', 'brand'] },
    );

    if (!product) throw new NotFoundException();
    return product;
  }

  async getProductByCategory(categoryId: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .select()
      .where('product.category.id = :categoryId', { categoryId })
      .limit(10)
      .getMany();
  }

  async getProductsByBrand(brandId: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .select()
      .where('product.brand.id = :brandId', { brandId })
      .limit(10)
      .getMany();
  }

  async createProduct(createDto: CreateProductDto): Promise<Product> {
    const { categorySlug, brandSlug, ...dto } = createDto;

    const category = await this.categoryRepository.findOne({
      slug: categorySlug,
    });
    const brand = await this.brandRepository.findOne({ slug: brandSlug });

    const newProduct = this.productRepository.create({
      ...dto,
      slug: stringHelper.generateSlug(dto.name),
      category,
      brand,
    });

    return this.productRepository.save(newProduct);
  }
}
