import { Controller, Get, Param } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly catServices: CategoriesService) {}

  @Get(':slug')
  getCategories(@Param('slug') slug: string): Promise<Category> {
    return this.catServices.getCategories(slug);
  }
}
