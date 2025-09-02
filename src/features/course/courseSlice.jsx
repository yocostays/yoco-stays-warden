import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCoursesAsync } from "./courseApi";

const initialState = {
  allHostel: [],
  bedType: [],
  loading: false,
  isSubmitting: false,
  isLoading: false,
  roomNo: [],
  roleList: [],
  hostelList:[],
  floorList:[],
  roomList:[],
  courseList:[],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearRoomDetails(state) {
      state.roomNo = [];
    },
  },
  extraReducers: (builder) => {
    // room number
    builder.addMatcher(isAnyOf(getCoursesAsync.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(getCoursesAsync.fulfilled),
      (state, { payload }) => {
        state.loading = false;
        state.courseList = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getCoursesAsync.rejected), (state) => {
      state.loading = false;
      state.courseList = [];
    });
    // ===================
  },
});

export const { clearRoomDetails } = courseSlice.actions;
export default courseSlice.reducer;
