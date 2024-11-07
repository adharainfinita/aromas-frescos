import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces/product';


interface ProductState {
  products: IProduct[],
  detail: IProduct | null,
}

const initialState: ProductState = {
  products: [],
  detail: {
    product_id: 0,
    product_name: "",
    product_brand: "",
    product_category: "",
    product_price: 0,
    product_available: false,
    product_stock: 0,
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setProductDetail: (state, action: PayloadAction<IProduct | null>) => {
      state.detail = action.payload;
    },
    getProductById: (state, action: PayloadAction<IProduct | null>) => {
      state.detail = action.payload;
    },
  },
});

export const {
  getProducts,
  setProductDetail,
  getProductById,
} = productsSlice.actions;

// Selectores


export default productsSlice.reducer;
