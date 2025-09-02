import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createStaffAsync,
  getStaffAsync,
  getStaffDetailAsync,
} from "./staffService";

const initialState = {
  isLoading: false,
  isSubmitting: false,
  staffList: [],
  staffDetails: {},
  totalStaffCount: 0,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearRoomDetails(state) {
      state.roomNo = [];
    },
  },
  extraReducers: (builder) => {
    // room number
    builder.addMatcher(isAnyOf(getStaffAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getStaffAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.staffList = payload?.data;
        state.totalStaffCount = payload?.count;
      }
    );
    builder.addMatcher(isAnyOf(getStaffAsync.rejected), (state) => {
      state.isLoading = false;
      state.staffList = [];
    });
    
    // room number
    builder.addMatcher(isAnyOf(createStaffAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(
      isAnyOf(createStaffAsync.fulfilled),
      (state) => {
        state.isSubmitting = false;
      }
    );
    builder.addMatcher(isAnyOf(createStaffAsync.rejected), (state) => {
      state.isSubmitting = false;
      state.staffList = [];
    });
    // room number
    builder.addMatcher(isAnyOf(getStaffDetailAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(
      isAnyOf(getStaffDetailAsync.fulfilled),
      (state, { payload }) => {
        state.isSubmitting = false;
        state.staffDetails = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getStaffDetailAsync.rejected), (state) => {
      state.isSubmitting = false;
      state.staffDetails = {};
    });
    // ===================
  },
});

export const { clearRoomDetails } = staffSlice.actions;
export default staffSlice.reducer;
