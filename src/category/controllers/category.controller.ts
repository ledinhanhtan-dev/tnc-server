import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryQueryDto } from '../dto/category-query.dto';
import { Category } from '../entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly catServices: CategoryService) {}

  @Get(':slug')
  getCategories(
    @Param('slug') slug: string,
    @Query() catQueryDto: CategoryQueryDto,
  ): Promise<Category> {
    return this.catServices.getCategories(slug, catQueryDto);
  }
}
