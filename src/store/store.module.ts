import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { StoreController } from './controllers/store.controller';
import { Store } from './entities/store.entity';
import { StoreService } from './services/store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Category])],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
