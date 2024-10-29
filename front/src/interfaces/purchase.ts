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

export interface PurchaseForm {
	customer_id: number;
	amount: number;
	paid: boolean;
	paid_date: string;
}
export type IdetailsForm = Omit<IDetails, "purchase_detail_id">;

export interface IPurchaseForm {
	purchase: PurchaseForm;
	details: IdetailsForm;
}
