// clientsSlice.ts
import { createSlice,  } from '@reduxjs/toolkit';
import { ICustomer } from '../../interfaces/customer';
import { PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
  customers: ICustomer[],
  detail: ICustomer | null
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
    },
    setCustomerDetail: (state, action: PayloadAction<ICustomer | null>) => {
      state.detail = action.payload;
    },
    orderCustomers: (state, action:PayloadAction<string>) =>{
      const productsCopy = [...state.customers];

        action.payload === "A"
          ? productsCopy.sort((a, b) => {
              if (a.customer_name < b.customer_name) return -1;
              if (a.customer_name > b.customer_name) return 1;
              return 0;
            })
          : productsCopy.sort((a, b) => {
              if (a.customer_name > b.customer_name) return -1;
              if (a.customer_name < b.customer_name) return 1;
              return 0;
            });
            
        state.customers = productsCopy;
      }
  },
});

export const { getCustomers, setCustomerDetail, orderCustomers } = customersSlice.actions;
export default customersSlice.reducer;
