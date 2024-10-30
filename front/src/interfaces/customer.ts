export interface ICustomer {
  customer_id: number;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
}

export interface ICustomerForm {
  name: string;
  email?: string;
  phone: string;
}

export type ICustomerEditForm = Partial<ICustomerForm>;