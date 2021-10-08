import { Controller, Get } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { BrandService } from '../services/brand.service';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandsService: BrandService) {}

  @Get('')
  getBrands(): Promise<Brand[]> {
    return this.brandsService.getBrands();
  }
}
