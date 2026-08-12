import { IsIn, IsString } from 'class-validator';

export class CheckoutDto {
  @IsString()
  customerId!: string;

  @IsString()
  shippingAddress!: string;

  @IsIn(['card', 'paynow', 'bank-transfer'])
  paymentMethod!: 'card' | 'paynow' | 'bank-transfer';
}
