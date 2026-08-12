import { Module } from '@nestjs/common';
import { CartsModule } from './carts/carts.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';

@Module({
  imports: [ProductsModule, CustomersModule, CartsModule, OrdersModule],
  controllers: [AppController],
})
export class AppModule {}
