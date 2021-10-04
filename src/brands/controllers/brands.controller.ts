import { Controller, Get } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get('')
  getBrands(): Promise<Brand[]> {
    return this.brandsService.getBrands();
  }
}
