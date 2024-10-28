import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPurchase, IDetail } from '../../interfaces/purchase';

interface PurchaseState {
  purchases: IPurchase[],
  detail: IDetail | null
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
    },
    setPurchaseDetail: (state, action: PayloadAction<IDetail | null>)=>{
      state.detail = action.payload;
    }
  }
});

export const {getPurchases, setPurchaseDetail} = purchaseSlice.actions;
export default purchaseSlice.reducer;