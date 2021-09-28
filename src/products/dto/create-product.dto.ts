import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPositive()
  price: number;

  @IsPositive()
  priceOld: number;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsArray()
  @ArrayMinSize(1)
  images: string[];

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  guarantee: number;

  @IsNotEmpty()
  @IsArray()
  shortDescriptions: string[];

  @IsNotEmpty()
  @IsBoolean()
  available: boolean = true;
}
