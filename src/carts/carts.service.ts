import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { Cart } from './carts.types';

@Injectable()
export class CartsService {
  private readonly carts = new Map<string, Cart>();

  constructor(
    private readonly customersService: CustomersService,
    private readonly productsService: ProductsService,
  ) {}

  getCart(customerId: string) {
    this.customersService.findOne(customerId);

    const cart = this.ensureCart(customerId);
    const items = cart.items.map((item) => {
      const product = this.productsService.findOne(item.productId);

      return {
        productId: item.productId,
        quantity: item.quantity,
        productName: product.name,
        unitPrice: product.price,
        lineTotal: product.price * item.quantity,
      };
    });

    return {
      customerId,
      items,
      total: items.reduce((sum, item) => sum + item.lineTotal, 0),
    };
  }

  addItem(customerId: string, dto: AddCartItemDto) {
    this.customersService.findOne(customerId);
    const product = this.productsService.findOne(dto.productId);

    if (product.stock < dto.quantity) {
      throw new NotFoundException(`Only ${product.stock} units left for product ${dto.productId}.`);
    }

    const cart = this.ensureCart(customerId);
    const existingItem = cart.items.find((item) => item.productId === dto.productId);

    if (existingItem) {
      existingItem.quantity += dto.quantity;
    } else {
      cart.items.push({ productId: dto.productId, quantity: dto.quantity });
    }

    return this.getCart(customerId);
  }

  removeItem(customerId: string, productId: string) {
    this.customersService.findOne(customerId);
    const cart = this.ensureCart(customerId);
    const nextItems = cart.items.filter((item) => item.productId !== productId);

    if (nextItems.length === cart.items.length) {
      throw new NotFoundException(`Product ${productId} is not in cart ${customerId}.`);
    }

    cart.items = nextItems;
    return this.getCart(customerId);
  }

  clearCart(customerId: string) {
    const cart = this.ensureCart(customerId);
    cart.items = [];
  }

  getRawCart(customerId: string) {
    this.customersService.findOne(customerId);
    return this.ensureCart(customerId);
  }

  private ensureCart(customerId: string) {
    const existing = this.carts.get(customerId);

    if (existing) {
      return existing;
    }

    const cart: Cart = {
      customerId,
      items: [],
    };

    this.carts.set(customerId, cart);
    return cart;
  }
}
