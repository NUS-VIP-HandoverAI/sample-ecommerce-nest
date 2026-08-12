export interface Customer {
  id: string;
  name: string;
  email: string;
  loyaltyTier: 'bronze' | 'silver' | 'gold';
}
