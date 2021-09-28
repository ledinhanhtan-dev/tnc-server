import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get('home')
  getHomeProducts() {
    return this.productsService.getHomeProducts();
  }

  @Get(':idName')
  getProductByIdName(@Param('idName') idName: string): Promise<Product> {
    return this.productsService.getProductByIdName(idName);
  }

  @Post('create')
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }
}
