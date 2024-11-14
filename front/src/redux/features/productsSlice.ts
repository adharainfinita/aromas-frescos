import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/product";
import { FiltersCache } from "../../interfaces/filtersCache";

interface ProductState {
	products: IProduct[];
	originalCopy: IProduct[];
	detail: IProduct | null;
	requireFilters: FiltersCache;
}

const initialState: ProductState = {
	products: [],
	originalCopy: [],
	detail: {
		product_id: 0,
		product_name: "",
		product_brand: "",
		product_category: "",
		product_price: 0,
		product_available: false,
		product_stock: 0,
	},
	requireFilters: {
		availbable: null,
		category: null,
	},
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getProducts: (state, action: PayloadAction<IProduct[]>) => {
			state.products = action.payload;
			state.originalCopy = action.payload;
		},
		setProductDetail: (state, action: PayloadAction<IProduct | null>) => {
			state.detail = action.payload;
		},
		getProductById: (state, action: PayloadAction<IProduct | null>) => {
			state.detail = action.payload;
		},
		filterProductsByCategory: (state, action: PayloadAction<string>) => {
			let productsFound: IProduct[] = [...state.originalCopy];
			state.requireFilters.category = action.payload;

			if (action.payload === "All") state.requireFilters.category = null;
			else {
				productsFound = productsFound.filter(
					(match) => match.product_category === action.payload
				);
			}

			if (state.requireFilters.availbable) {
				productsFound = productsFound.filter(
					(match) => match.product_available === state.requireFilters.availbable
				);
			}
			state.products = productsFound;
		},
		filtersProductByAvailable: (
			state,
			action: PayloadAction<boolean | null>
		) => {
			let productsFound: IProduct[] = [...state.originalCopy];
			state.requireFilters.availbable = action.payload;

			if (action.payload !== null) {
				productsFound = productsFound.filter(
					(match) => match.product_available === action.payload
				);
			}

			if (state.requireFilters.category) {
				productsFound = productsFound.filter(
					(match) => match.product_category === state.requireFilters.category
				);
			}

			state.products = productsFound;
		},
		resetFilters: (state, _action: PayloadAction<void>) => {
			state.requireFilters = initialState.requireFilters;
			state.products = state.originalCopy;
		},
		orderProducts: (state, action: PayloadAction<string>) => {
			const productsCopy = [...state.products];

			action.payload === "A"
				? productsCopy.sort((a, b) => {
						if (a.product_name < b.product_name) return -1;
						if (a.product_name > b.product_name) return 1;
						return 0;
				  })
				: productsCopy.sort((a, b) => {
						if (a.product_name > b.product_name) return -1;
						if (a.product_name < b.product_name) return 1;
						return 0;
				  });

			state.products = productsCopy;
		},
	},
});

export const {
	getProducts,
	setProductDetail,
	getProductById,
	filterProductsByCategory,
	filtersProductByAvailable,
	resetFilters,
	orderProducts,
} = productsSlice.actions;

// Selectores

export default productsSlice.reducer;
