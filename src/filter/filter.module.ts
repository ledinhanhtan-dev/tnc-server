import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
import { Filter } from './entities/filter.entity';
import { FilterService } from './services/filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Filter, Tag])],
  providers: [FilterService],
})
export class FilterModule {}
