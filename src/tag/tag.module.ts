import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from 'src/filter/entities/filter.entity';
import { Product } from 'src/product/entities/product.entity';
import { TagController } from './controllers/tag.controller';
import { TagService } from './services/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Filter])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
