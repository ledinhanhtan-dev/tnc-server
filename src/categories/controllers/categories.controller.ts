import { Controller, Get } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly catServices: CategoriesService) {}

  @Get('')
  getCategories(): Promise<Category[]> {
    return this.catServices.getCategories();
  }
}
