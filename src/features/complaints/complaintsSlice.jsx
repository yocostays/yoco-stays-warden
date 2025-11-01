import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AssignStaffApi, bulkUpdateComplaintApi, exportComplaintReportApi, fetchComplaintById, fetchComplaint, getAvgResolutionTimeApi, getComplaintCategoryApi, getFrequentComplaintCategoriesApi, getStaffListApi, getTotalComplaintOverviewApi } from "./complaintsApi";

// Define the initial state
const initialState = {
  getComplaintCategory: [],
  getFrequentComplaintCategories: [],
  getAvgResolutionTime: [],
  isLoading: false,
  isGraphLoading: false,
  isResolutionLoading: false,
  error: null,
};

// Thunk for fetching users
export const getComplaintCategoryAsync = createAsyncThunk(
  "complaint/getComplaintCategory",
  async (newData) => {
    const data = await getComplaintCategoryApi(newData);
    return data;
  }
);
export const getLeaveDataByIdAsync = createAsyncThunk(
  "leave/getLeaveDataById",
  async (id) => {
    const data = await fetchComplaintById(id);
    return data;
  }
);

export const bulkUpdateComplaintAsync = createAsyncThunk(
  "complaint/bulkUpdateComplaint",
  async (newData) => {
    const data = await bulkUpdateComplaintApi(newData);
    return data;
  }
);


export const getStaffListAsync = createAsyncThunk(
  "complaint/getStaffListApi",
  async (newData) => {
    console.log(newData,"newData")
    const data = await getStaffListApi(newData);
    return data;
  }
);

export const assignStaffAsync = createAsyncThunk(
  "complaint/AssignStaffApi",
  async (newData) => {
    const data = await AssignStaffApi(newData);
    return data;
  }
);

// Thunk for fetching getFrequentComplaintCategories
export const getFrequentComplaintCategoriesAsync = createAsyncThunk(
  "complaint/getFrequentComplaintCategories",
  async (newData) => {
    const data = await getFrequentComplaintCategoriesApi(newData);
    return data;
  }
);

// Thunk for fetching getTotalComplaintOverview
export const getTotalComplaintOverviewAsync = createAsyncThunk(
  "complaint/getTotalComplaintOverview",
  async (newData) => {
    const data = await getTotalComplaintOverviewApi(newData);
    return data;
  }
);

// Thunk for fetching getTotalComplaintOverview
export const getAvgResolutionTimeAsync = createAsyncThunk(
  "complaint/getAvgResolutionTime",
  async (newData) => {
    const data = await getAvgResolutionTimeApi(newData);
    return data;
  }
);

export const exportComplaintReportAsync = createAsyncThunk(
  "leave/exportLeaveReport",
  async (body) => {
    const data = await exportComplaintReportApi(body);
    return data;
  }
);

export const getComplaints = createAsyncThunk(
  "complaint/getComplaints",
  async ({ page, limit, status, categoryId, sort, startDate, endDate,search,floorNumber,roomNumber }) => {
    const data = await fetchComplaint(page, limit, status,categoryId,sort, startDate,endDate, search,floorNumber,roomNumber);
    return data;
  }
);

const complaintSlice = createSlice({
name: "complaint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getUsers cases
      .addCase(getComplaintCategoryAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getComplaintCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getComplaintCategory = action.payload;
      })
      .addCase(getComplaintCategoryAsync.rejected, (state) => {
        state.isLoading = false;
        state.getComplaintCategory = [];
      });

      // Handle getUsers cases
      builder
      .addCase(getFrequentComplaintCategoriesAsync.pending, (state) => {
        state.isGraphLoading = true;
        state.error = null;
      })
      .addCase(getFrequentComplaintCategoriesAsync.fulfilled, (state, action) => {
        state.isGraphLoading = false;
        state.getFrequentComplaintCategories = action.payload.data;
      })
      .addCase(getFrequentComplaintCategoriesAsync.rejected, (state) => {
        state.isGraphLoading = false;
        state.getFrequentComplaintCategories = [];
      });
    
      // Handle getUsers cases
      builder
      .addCase(getTotalComplaintOverviewAsync.pending, (state) => {
        state.isGraphLoading = true;
        state.error = null;
      })
      .addCase(getTotalComplaintOverviewAsync.fulfilled, (state, action) => {
        state.isGraphLoading = false;
        state.getTotalComplaintOverview = action.payload.data;
      })
      .addCase(getTotalComplaintOverviewAsync.rejected, (state) => {
        state.isGraphLoading = false;
        state.getTotalComplaintOverview = [];
      });
    
      // Handle getUsers cases
      builder
      .addCase(getAvgResolutionTimeAsync.pending, (state) => {
        state.isResolutionLoading = true;
        state.error = null;
      })
      .addCase(getAvgResolutionTimeAsync.fulfilled, (state, action) => {
        state.isResolutionLoading = false;
        state.getAvgResolutionTime = action.payload.data;
      })
      .addCase(getAvgResolutionTimeAsync.rejected, (state) => {
        state.isResolutionLoading = false;
        state.getAvgResolutionTime = [];
      });


      // Get Complaints
      builder
      .addCase(getComplaints.pending, (state) => {
        state.isComplaintLoading = true;
        state.error = null;
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.isComplaintLoading = false;
        state.complaintData = action.payload.data;
        state.totalCount = action.payload.count;
      })
      .addCase(getComplaints.rejected, (state) => {
        state.isComplaintLoading = false;
        state.complaintData = [];
      });
      // Handle getComplaint by ID
          builder
            .addCase(getLeaveDataByIdAsync.pending, (state) => {
              state.isComplaintLoading = true;
            })
            .addCase(getLeaveDataByIdAsync.fulfilled, (state, action) => {
              state.isComplaintLoading = false;
              state.complaintDataById = action?.payload?.data;
            })
            .addCase(getLeaveDataByIdAsync.rejected, (state) => {
              state.isComplaintLoading = false;
              state.complaintDataById = {};
            });

      //get staff list 
      builder
      .addCase(getStaffListAsync.pending, (state) => {
        state.isGraphLoading = true;
        state.error = null;
      })
      .addCase(getStaffListAsync.fulfilled, (state, action) => {
        state.isGraphLoading = false;
        state.staffList = action.payload.data;
      })
      .addCase(getStaffListAsync.rejected, (state) => {
        state.isGraphLoading = false;
        state.staffList = [];
      });



      builder
      .addCase(assignStaffAsync.pending, (state) => {
        state.isGraphLoading = true;
        state.error = null;
      })
      .addCase(assignStaffAsync.fulfilled, (state, action) => {
        state.isGraphLoading = false;
        state.assignData = action.payload.data;
      })
      .addCase(assignStaffAsync.rejected, (state) => {
        state.isGraphLoading = false;
        state.assignData = [];
      });

      builder
      .addCase(bulkUpdateComplaintAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bulkUpdateComplaintAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bulkData = action.payload.data
      })
      .addCase(bulkUpdateComplaintAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

          builder
            .addCase(exportComplaintReportAsync.pending, (state) => {
              state.isReportLoading = true;
              state.error = null;
            })
            .addCase(exportComplaintReportAsync.fulfilled, (state) => {
              state.isReportLoading = false;
            })
            .addCase(exportComplaintReportAsync.rejected, (state) => {
              state.isReportLoading = false;
            });
      
  },
});

// export const selectSubmitting = (state) => state.student.submitting;
// Export the reducer
export default complaintSlice.reducer;
