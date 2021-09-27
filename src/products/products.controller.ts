import { Controller, Get } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('home')
  getProduct() {
    return this.productsService.getHomeProducts();
  }
}
