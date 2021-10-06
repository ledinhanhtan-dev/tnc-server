import { Controller, Get, Param, Query } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly catServices: CategoriesService) {}

  @Get(':slug')
  getCategories(
    @Param('slug') slug: string,
    @Query('sort') sort: string,
    @Query('order') order: 'ASC' | 'DESC',
  ): Promise<Category> {
    if (sort && order) return this.catServices.getCategories(slug, sort, order);
    else return this.catServices.getCategories(slug);
  }
}
