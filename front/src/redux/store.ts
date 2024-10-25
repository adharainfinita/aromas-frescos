// store.ts
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './features/clientsSlice';
import productsReducer from './features/productsSlice';
import purchaseReducer from './features/purchaseSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    products: productsReducer,
    purchases: purchaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
