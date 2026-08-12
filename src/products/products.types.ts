export type ProductCategory =
  | 'electronics'
  | 'fashion'
  | 'home'
  | 'beauty'
  | 'sports';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  currency: 'SGD';
  stock: number;
  featured: boolean;
  imageUrl: string;
  sku: string;
}
