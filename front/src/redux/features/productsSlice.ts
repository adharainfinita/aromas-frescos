import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces/product';
import { RootState } from '../store';

interface ProductState {
  products: IProduct[],
  detail: IProduct | null,
  filters: {
    category: string | null,
    availability: boolean | null,
  }
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
  filters: {
    category: null,
    availability: null,
  }
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
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.category = action.payload;
    },
    setAvailabilityFilter: (state, action: PayloadAction<boolean | null>) => {
      state.filters.availability = action.payload;
    },
  },
});

export const {
  getProducts,
  setProductDetail,
  getProductById,
  setCategoryFilter,
  setAvailabilityFilter,
} = productsSlice.actions;

// Selectores
export const selectFilteredAndSortedProducts = createSelector(
  (state: RootState) => state.products.products,
  (state: RootState) => state.products.filters,
  (products, filters) => {
    // Filtrar por categoría y disponibilidad
    let filteredProducts = products.filter((product) => {
      return (
        (filters.category ? product.product_category === filters.category : true) &&
        (filters.availability !== null ? product.product_available === filters.availability : true)
      );
    });

    // Ordenar alfabéticamente por nombre
    return filteredProducts.sort((a, b) =>
      a.product_name.localeCompare(b.product_name)
    );
  }
);

export default productsSlice.reducer;
