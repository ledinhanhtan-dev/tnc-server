import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { stringHelper } from 'src/helpers/stringHelper.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { HomeProducts } from './interfaces/home-products';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PRODUCT_CARD_PROPERTIES } from './constants';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async getHomeProducts(): Promise<HomeProducts> {
    const discountProducts = await this.productsRepository
      .createQueryBuilder('product')
      .select(PRODUCT_CARD_PROPERTIES)
      .limit(10)
      .getMany();

    // const products = await this.productsRepository.find();
    return { discountProducts, newProducts: [], hotProducts: [] };
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ id });
    if (!product) throw new NotFoundException();
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create({
      ...createProductDto,
      id: stringHelper.generateId(createProductDto.name),
    });

    return this.productsRepository.save(newProduct);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.getProduct(id);
    return this.productsRepository.save({ ...product, ...updateProductDto });
  }
}
