// clientsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await axios.get('/api/clients');
  return response.data;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    data: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      });
  },
});

export default clientsSlice.reducer;
