export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  customerId: string;
  shippingAddress: string;
  paymentMethod: 'card' | 'paynow' | 'bank-transfer';
  status: 'pending' | 'paid' | 'shipped';
  items: OrderItem[];
  total: number;
  createdAt: string;
}
