import { IsBoolean, IsIn, IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { ProductCategory } from '../products.types';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsIn(['electronics', 'fashion', 'home', 'beauty', 'sports'])
  category!: ProductCategory;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price!: number;

  @IsInt()
  @Min(0)
  stock!: number;

  @IsBoolean()
  featured!: boolean;

  @IsString()
  imageUrl!: string;

  @IsString()
  sku!: string;
}
