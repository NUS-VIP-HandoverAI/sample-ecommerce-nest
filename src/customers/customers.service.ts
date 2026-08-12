import { Injectable, NotFoundException } from '@nestjs/common';
import { customerSeed } from './customers.seed';

@Injectable()
export class CustomersService {
  private readonly customers = structuredClone(customerSeed);

  findAll() {
    return this.customers;
  }

  findOne(id: string) {
    const customer = this.customers.find((item) => item.id === id);

    if (!customer) {
      throw new NotFoundException(`Customer ${id} was not found.`);
    }

    return customer;
  }
}
