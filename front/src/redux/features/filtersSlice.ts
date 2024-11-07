import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string | null;
  availability: boolean | null;
}

const initialState: FilterState = {
  category: null,
  availability: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setAvailabilityFilter: (state, action: PayloadAction<boolean | null>) => {
      state.availability = action.payload;
    },
  },
});

export const { setCategoryFilter, setAvailabilityFilter } = filterSlice.actions;
export default filterSlice.reducer;
