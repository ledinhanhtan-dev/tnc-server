import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { ProductsService } from 'src/products/services/products.service';
import { Product } from 'src/products/entities/product.entity';
import { Brand } from 'src/brands/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, Brand])],
  providers: [CategoriesService, ProductsService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
