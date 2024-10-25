// clientsSlice.ts
import { createSlice,  } from '@reduxjs/toolkit';
import { ICustomer } from '../../interfaces/customer';
import { PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
  customers: ICustomer[],
  detail: ICustomer
}

const initialState: CustomerState = {
  customers: [],
  detail: {
    customer_id: 0,
    customer_name: "",
    customer_email: "",
    customer_phone: ""
  }
}

const customersSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    getCustomers: (state, action: PayloadAction<ICustomer[]>) => {
      state.customers = action.payload;
    }
  },
});

export const { getCustomers } = customersSlice.actions;
export default customersSlice.reducer;
