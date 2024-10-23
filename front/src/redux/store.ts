// store.ts
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './features/clientsSlice';
import productsReducer from './features/productsSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
