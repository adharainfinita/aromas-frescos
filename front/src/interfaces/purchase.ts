export interface IPurchase {
  purchase_id: number;
  customer_id: number;
  purchase_amount: number;
  purchase_paid: boolean;
  purchase_paid_date: string;
}

export interface IDetail {
  details: Array<IDetails>;
}
export interface IDetails {
  purchase_detail_id: number;
  purchase_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
}