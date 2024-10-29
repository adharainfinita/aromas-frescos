export interface IProduct {
  product_id: number;
  product_name: string;
  product_brand: string;
  product_category: string;
  product_price: number;
  product_available: boolean;
  product_discontinued?: boolean;
}

export interface IProductForm {
  name: string;
  brand: string;
  category: string;
  price: number;
  available: boolean;
  discontinued?: boolean;

}

export type IProductEditForm = Partial<IProductForm>
