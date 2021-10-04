import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

enum Brands {
  ASUS = 'asus',
}
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPositive()
  price: number;

  @IsNumber()
  @Min(0)
  priceOld: number;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  images: string[];

  @IsArray()
  @IsNotEmpty({ each: true })
  shortDesc: string[];

  @IsObject()
  rating: { score: number; count: number };

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  guarantee: number;

  @IsNotEmpty()
  @IsBoolean()
  inStock: boolean = true;

  @IsNotEmpty()
  @IsEnum(Brands)
  brandSlug: string;

  @IsNotEmpty()
  categorySlug: string;
}
