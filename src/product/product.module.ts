import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { Category } from 'src/category/entities/category.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category, Tag])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
