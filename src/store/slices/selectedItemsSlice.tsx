import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [], // Initial state is an empty array
};

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload; // Update selectedItems state
    },
  },
});

export const { setSelectedItems } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
