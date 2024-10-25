export interface IPurchase {
  id: number;
  customer_id: number;
  amount: number;
  paid: boolean;
  paid_date: string;
}

export interface IDetails {
  id: number;
  purchase_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
}