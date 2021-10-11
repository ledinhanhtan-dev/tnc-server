import { Controller, Get, Param } from '@nestjs/common';
import { Store } from '../entities/store.entity';
import { StoreService } from '../services/store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(':slug')
  getStore(@Param('slug') slug: string): Promise<Store> {
    return this.storeService.getStore(slug);
  }
}
