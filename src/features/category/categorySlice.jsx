import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCategoryAsync } from "./categoryService";

const initialState = {
    isLoading : false,
    categoryList: []
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearRoomDetails(state) {
      state.roomNo = [];
    },
  },
  extraReducers: (builder) => {
    // room number
    builder.addMatcher(isAnyOf(getCategoryAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getCategoryAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.categoryList = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getCategoryAsync.rejected), (state) => {
      state.isLoading = false;
      state.categoryList = [];
    });
    // ===================
  },
});

export const { clearRoomDetails } = categorySlice.actions;
export default categorySlice.reducer;
