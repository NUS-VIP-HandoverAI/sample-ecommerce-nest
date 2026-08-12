import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { productSeed } from './product.seed';
import { Product } from './products.types';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = structuredClone(productSeed);

  findAll(query: QueryProductsDto) {
    return this.products.filter((product) => {
      const matchesCategory = query.category ? product.category === query.category : true;
      const matchesFeatured =
        typeof query.featured === 'boolean' ? product.featured === query.featured : true;
      const searchValue = query.search?.trim().toLowerCase();
      const matchesSearch = searchValue
        ? `${product.name} ${product.description}`.toLowerCase().includes(searchValue)
        : true;

      return matchesCategory && matchesFeatured && matchesSearch;
    });
  }

  findOne(id: string) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`Product ${id} was not found.`);
    }

    return product;
  }

  create(dto: CreateProductDto) {
    const product: Product = {
      id: `prod-${Date.now()}`,
      currency: 'SGD',
      ...dto,
    };

    this.products.unshift(product);

    return product;
  }

  reserveStock(productId: string, quantity: number) {
    const product = this.findOne(productId);

    if (product.stock < quantity) {
      throw new NotFoundException(`Insufficient stock for product ${productId}.`);
    }

    product.stock -= quantity;
    return product;
  }
}
