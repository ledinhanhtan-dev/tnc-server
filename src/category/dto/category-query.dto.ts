import { IsNumberString, IsOptional, IsString, Min } from 'class-validator';

enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class CategoryQueryDto {
  @IsOptional()
  @IsString()
  readonly sort: 'price' | 'name' | 'createdAt' = 'price';

  @IsOptional()
  @IsString()
  readonly order: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @Min(1)
  readonly currentPage: number = 1;
}
