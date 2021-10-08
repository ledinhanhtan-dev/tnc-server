import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get('home')
  getHomeProducts() {
    return this.productService.getHomeProducts();
  }

  @Get(':slug')
  getProduct(@Param('slug') slug: string): Promise<Product> {
    return this.productService.getProduct(slug);
  }

  @Get(':categoryId/category')
  getProductByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Product[]> {
    return this.productService.getProductByCategory(categoryId);
  }

  // @Post('create')
  // createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
  //   return this.productService.createProduct(createProductDto);
  // }

  // @Patch(':id/edit')
  // updateProduct(
  //   @Param('id') id: string,
  //   @Body() updateDto: UpdateProductDto,
  // ): Promise<Product> {
  //   return this.productService.updateProduct(id, updateDto);
  // }
}
