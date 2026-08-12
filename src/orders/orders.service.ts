import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CartsService } from '../carts/carts.service';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import { CheckoutDto } from './dto/checkout.dto';
import { Order } from './orders.types';

@Injectable()
export class OrdersService {
  private readonly orders: Order[] = [];

  constructor(
    private readonly cartsService: CartsService,
    private readonly customersService: CustomersService,
    private readonly productsService: ProductsService,
  ) {}

  findAll() {
    return this.orders;
  }

  findOne(id: string) {
    const order = this.orders.find((item) => item.id === id);

    if (!order) {
      throw new NotFoundException(`Order ${id} was not found.`);
    }

    return order;
  }

  checkout(dto: CheckoutDto) {
    this.customersService.findOne(dto.customerId);
    const cart = this.cartsService.getRawCart(dto.customerId);

    if (cart.items.length === 0) {
      throw new BadRequestException('Cannot checkout an empty cart.');
    }

    const items = cart.items.map((item) => {
      const product = this.productsService.reserveStock(item.productId, item.quantity);

      return {
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        lineTotal: product.price * item.quantity,
      };
    });

    const order: Order = {
      id: `ord-${Date.now()}`,
      customerId: dto.customerId,
      shippingAddress: dto.shippingAddress,
      paymentMethod: dto.paymentMethod,
      status: 'paid',
      items,
      total: items.reduce((sum, item) => sum + item.lineTotal, 0),
      createdAt: new Date().toISOString(),
    };

    this.orders.unshift(order);
    this.cartsService.clearCart(dto.customerId);

    return order;
  }
}
