import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryQueryDto } from '../dto/category-query.dto';
import { Category } from '../entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly catServices: CategoryService) {}

  @Get(':slug')
  getCategoryInitial(@Param('slug') slug: string): Promise<Category> {
    return this.catServices.getCategoryInitial(slug);
  }

  @Post(':slug')
  getFilteredCategory(
    @Param('slug') slug: string,
    @Query() catQueryDto: CategoryQueryDto,
    @Body('filters') filters: Tag[],
  ): Promise<Category> {
    if (filters.length === 0) {
      return this.catServices.getCategory(slug, catQueryDto);
    } else {
      return this.catServices.getFilteredCategory(slug, catQueryDto, filters);
    }
  }
}
