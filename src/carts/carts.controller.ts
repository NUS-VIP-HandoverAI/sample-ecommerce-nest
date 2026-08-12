import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get(':customerId')
  getCart(@Param('customerId') customerId: string) {
    return this.cartsService.getCart(customerId);
  }

  @Post(':customerId/items')
  addItem(@Param('customerId') customerId: string, @Body() dto: AddCartItemDto) {
    return this.cartsService.addItem(customerId, dto);
  }

  @Delete(':customerId/items/:productId')
  removeItem(@Param('customerId') customerId: string, @Param('productId') productId: string) {
    return this.cartsService.removeItem(customerId, productId);
  }
}
