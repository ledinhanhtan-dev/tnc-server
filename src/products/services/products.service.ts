import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { stringHelper } from 'src/helpers/stringHelper.helper';
// import { CreateProductDto } from './dto/create-product.dto';
import { HomeProducts } from '../interfaces/home-products';
import { Product } from '../entities/product.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { PRODUCT_CARD_PROPERTIES } from '../constants';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
// import { UpdateProductDto } from './dto/update-product.dto';

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

  // async createProduct(createProductDto: CreateProductDto): Promise<Product> {
  //   const product = this.productsRepository.create({
  //     name: 'Card Màn Hình Asus Dual GeForce RTX3060 Ti V2 Edition (LHR)',
  //     slug: 'card-man-hinh-asus-dual-geforce-rtx3060-ti-v2-edition-lhr',
  //     price: 20900000,
  //     priceOld: 21290000,
  //     thumbnail:
  //       'http://localhost:3000/image/product/vga/asus/card-man-hinh-asus-dual-geforce-rtx3060-ti-v2-edition-1-228x228.jpg',
  //     images: [
  //       'http://localhost:3000/image/product/vga/asus/card-man-hinh-asus-dual-geforce-rtx3060-ti-v2-edition-1-500x500.jpg',
  //       'http://localhost:3000/image/product/vga/asus/card-man-hinh-asus-dual-geforce-rtx3060-ti-v2-edition-2-500x500.jpg',
  //       'http://localhost:3000/image/product/vga/asus/card-man-hinh-asus-dual-geforce-rtx3060-ti-v2-edition-3-500x500.jpg',
  //       'http://localhost:3000/image/product/vga/asus/card-man-hinh-asus-dual-geforce-rtx3060-ti-v2-edition-4-500x500.jpg',
  //     ],
  //     rating: { score: 4, count: 11 },
  //     guarantee: 36,
  //     shortDesc: [
  //       'Dung lượng bộ nhớ: 8GB GDDR6',
  //       'Stream Core: 4864',
  //       'Chuẩn kết nối: PCI Express 4.0',
  //       'Kết nối: 2 x HDMI2.1, 3 x DisplayPort™ 1.4a',
  //       'Nguồn yêu cầu: 750W',
  //     ],
  //     inStock: true,
  //     brand: await this.categoriesRepository.findOne(1),
  //     category: await this.categoriesRepository.findOne(1),
  //   });

  //   await this.productsRepository.save(product);

  //   return product;

  //   const newProduct = this.productsRepository.create({
  //     ...createProductDto,
  //     id: stringHelper.generateId(createProductDto.name),
  //   });

  //   return this.productsRepository.save(newProduct);
  // }

  // async updateProduct(id: string, updateProductDto: UpdateProductDto) {
  //   const product = await this.getProduct(id);
  //   return this.productsRepository.save({ ...product, ...updateProductDto });
  // }
}
