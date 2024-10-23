import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/api/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      });
  },
})

export default productsSlice.reducer;