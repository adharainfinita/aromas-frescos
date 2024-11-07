// store.ts
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './features/clientsSlice';
import productsReducer from './features/productsSlice';
import purchaseReducer from './features/purchaseSlice';
import filterReducer from './features/filtersSlice'

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    products: productsReducer,
    purchases: purchaseReducer,
    filters: filterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
