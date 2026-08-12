import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from '../products.types';

export class QueryProductsDto {
  @IsOptional()
  @IsIn(['electronics', 'fashion', 'home', 'beauty', 'sports'])
  category?: ProductCategory;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  featured?: boolean;
}
