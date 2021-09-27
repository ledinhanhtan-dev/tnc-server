import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
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
  oldPrice: number;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}
