import { Module } from '@nestjs/common';
import { CustomersModule } from '../customers/customers.module';
import { ProductsModule } from '../products/products.module';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  imports: [CustomersModule, ProductsModule],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
