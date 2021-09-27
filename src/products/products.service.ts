import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringHelper } from 'src/helpers/stringHelper.helper';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { HomeProducts } from './interfaces/home-products';

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
    const products = await this.productsRepository.find();
    return { isFetched: true, discountProducts: products };
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create({
      ...createProductDto,
      idName: stringHelper.generateIdName(createProductDto.name),
    });

    return this.productsRepository.save(newProduct);
  }
}
