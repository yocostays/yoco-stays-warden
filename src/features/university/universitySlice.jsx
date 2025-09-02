import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { fetchUniversity, getUniversityListAsync } from "./universityApi";

export const getUniversityAsync = createAsyncThunk(
  "university/getUniversity",
  async ({ page, limit, search }) => {
    const data = await fetchUniversity(page, limit, search);
    return data;
  }
);

export const getUniversityList = createAsyncThunk(
  "university/getUniversityList",
  async () => {
    const data = await getUniversityListAsync();
    return data;
  }
);


// =========================== Sclices =====================
// Define the initial state
const initialState = {
  count: [],
  loading: false,
  getUniversity: [],
  universityList: [],
};

const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getUsers cases
      .addCase(getUniversityAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUniversityAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.getUniversity = action?.payload;
        state.count = action?.payload?.count;
      })
      .addCase(getUniversityAsync.rejected, (state) => {
        state.loading = false;
        state.getUniversity = [];
      });
    builder
      // Handle getUsers cases
      .addCase(getUniversityList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUniversityList.fulfilled, (state, action) => {
        state.loading = false;
        state.universityList = action?.payload?.data;
      })
      .addCase(getUniversityList.rejected, (state) => {
        state.loading = false;
        state.universityList = [];
      });
  },
  // ==================
});


// Export the reducer
export default universitySlice.reducer;