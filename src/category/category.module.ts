import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Category } from './entities/category.entity';
import { ProductService } from 'src/product/services/product.service';
import { Product } from 'src/product/entities/product.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Filter } from 'src/filter/entities/filter.entity';
import { FilterService } from 'src/filter/services/filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, Brand, Tag, Filter])],
  providers: [CategoryService, ProductService, FilterService],
  controllers: [CategoryController],
})
export class CategoryModule {}
