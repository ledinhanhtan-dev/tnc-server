import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  // @Get('home')
  // getHomeProducts() {
  //   return this.productsService.getHomeProducts();
  // }

  // @Get(':id')
  // getProduct(@Param('id') id: string): Promise<Product> {
  //   return this.productsService.getProduct(id);
  // }

  // @Post('create')
  // createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
  //   return this.productsService.createProduct(createProductDto);
  // }

  // @Patch(':id/edit')
  // updateProduct(
  //   @Param('id') id: string,
  //   @Body() updateDto: UpdateProductDto,
  // ): Promise<Product> {
  //   return this.productsService.updateProduct(id, updateDto);
  // }
}
