import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { TagController } from './controllers/tag.controller';
import { TagService } from './services/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
