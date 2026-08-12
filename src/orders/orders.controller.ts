import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post('checkout')
  checkout(@Body() dto: CheckoutDto) {
    return this.ordersService.checkout(dto);
  }
}
