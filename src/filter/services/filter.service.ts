import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
import { Repository } from 'typeorm';
import { Filter } from '../entities/filter.entity';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Filter)
    private readonly filterRepository: Repository<Filter>,
  ) {}

  async getFiltersByCatId(categoryId: number): Promise<Filter[]> {
    const filters = await this.filterRepository
      .createQueryBuilder('filter')
      .leftJoinAndSelect('filter.tags', 'tag')
      .where('filter.categoryId = :categoryId', { categoryId })
      .getMany();

    return filters;
  }
}
