import { Module } from '@nestjs/common';
import { CartsModule } from '../carts/carts.module';
import { CustomersModule } from '../customers/customers.module';
import { ProductsModule } from '../products/products.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [CartsModule, CustomersModule, ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
