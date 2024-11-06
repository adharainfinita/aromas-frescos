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
	[x: string]: any;
	purchase_detail_id: number;
	purchaseId?: number;  // Cambiado a opcional
	productId: number;
	quantity: number;
	pricePerUnit: number;
}

export interface PurchaseForm {
	customerId: number;
	totalAmount: number;
	paid: boolean;
	paidDate: string;
}

// Hacemos opcional purchaseId para evitar el error en el formulario
export type IdetailsForm = Omit<IDetails, "purchase_detail_id">;

export interface IPurchaseForm {
	purchase: PurchaseForm;
	details: IdetailsForm[];
}
