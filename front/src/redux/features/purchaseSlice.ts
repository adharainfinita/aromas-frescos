import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPurchase, IDetails } from '../../interfaces/purchase';

interface PurchaseState {
  purchases: IPurchase[],
  detail: IDetails | null
}

const initialState: PurchaseState = {
  purchases: [],
  detail: null
}


const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    getPurchases: (state, action:PayloadAction<IPurchase[]>)=>{
      state.purchases = action.payload;
    }
  }
});

export const {getPurchases} = purchaseSlice.actions;
export default purchaseSlice.reducer;