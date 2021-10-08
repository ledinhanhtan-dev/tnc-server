import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CategoryQueryDto } from '../dto/category-query.dto';
import { Category } from '../entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly catServices: CategoriesService) {}

  @Get(':slug')
  getCategories(
    @Param('slug') slug: string,
    @Query() catQueryDto: CategoryQueryDto,
  ): Promise<Category> {
    return this.catServices.getCategories(slug, catQueryDto);
  }
}
