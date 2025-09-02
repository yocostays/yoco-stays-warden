import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bulkUpdateStatusAsync,
  fetchChangeLeaveStatusById,
  fetchHistoryData,
  fetchLeaveDataById,
  fetchLeaveManagement,
  fetchLeaveReportSummary,
  fetchLeaveSummary,
  fetchPassInfo,
  fetchCurrentlyOut,
  exportLeaveReportApi,
} from "./leaveApi";

const initialState = {
  leaveManagementList: [],
  leaveDataById: {},
  changeLeaveStatus: {},
  leaveReportSummary: {},
  leaveSummary: [],
  passInfo: [],
  currentlyOutInfo: [],
  historyData: [],
  count: [],
  historyCount: [],
  isLeaveLoading: false,
  isSummaryLoading: false,
  isCurrentlyOutLoading: false,
  isLeaveHistory: false,
  submitting: false,
  isReportLoading: false,
  error: null,

  // Reducer functions
  reduxStartDate: null,
  reduxEndDate: null,
};

// Thunk for fetching Leave management data
export const getLeaveManagementList = createAsyncThunk(
  "leave/getLeaveManagementList",
  async ({
    page,
    limit,
    status,
    leaveStatus,
    search,
    sort,
    startDate,
    endDate,
    floorNumber,
    roomNumber,
  }) => {
    const data = await fetchLeaveManagement(
      page,
      limit,
      status,
      leaveStatus,
      search,
      sort,
      startDate,
      endDate,
      floorNumber,
      roomNumber
    );
    return data;
  }
);

// Thunk for fetching Leave Details By Id
export const getLeaveDataById = createAsyncThunk(
  "leave/getLeaveDataById",
  async (id) => {
    const data = await fetchLeaveDataById(id);
    return data;
  }
);

// Thunk for fetching Leave Details By Id
export const getLeaveReportSummary = createAsyncThunk(
  "leave/getLeaveReportSummary",
  async (body) => {
    const data = await fetchLeaveReportSummary(body);
    return data;
  }
);

// Thunk for fetching Leave Details By Id
export const getLeaveSummary = createAsyncThunk(
  "leave/getLeaveSummary",
  async (body) => {
    const data = await fetchLeaveSummary(body);
    return data;
  }
);

export const getPassInfo = createAsyncThunk(
  "leave/getPassInfo",
  async (body) => {
    const data = await fetchPassInfo(body);
    return data;
  }
);
export const bulkUpdateStatus = createAsyncThunk(
  "leave/bulkUpdateStatus",
  async ({ data }) => {
    const response = await bulkUpdateStatusAsync(data);
    return response;
  }
);

export const changeLeaveStatusById = createAsyncThunk(
  "leave/changeLeaveStatusById",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await fetchChangeLeaveStatusById(data, id);
      return response; // Assuming the response contains the updated status data
    } catch (error) {
      console.error("Error updating leave status:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLeaveManagementHistory = createAsyncThunk(
  "leave/getLeaveManagementHistory",
  async ({
    page,
    limit,
    status,
    userId,
    leaveStatus,
    durationType,
    startDate,
    endDate,
  }) => {
    const data = await fetchHistoryData(
      page,
      limit,
      status,
      userId,
      leaveStatus,
      durationType,
      startDate,
      endDate
    );
    return data;
  }
);

export const getCurrentlyOutInfo = createAsyncThunk(
  "leave/getCurrentlyOutInfo",
  async (body) => {
    const data = await fetchCurrentlyOut(body); // Pass parameters to fetchMess
    return data;
  }
);

export const exportLeaveReportAsync = createAsyncThunk(
  "leave/exportLeaveReport",
  async (body) => {
    const data = await exportLeaveReportApi(body);
    return data;
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    getReduxStartDate: (state, action) => {
      state.reduxStartDate = action.payload;
    },
    getReduxEndDate: (state, action) => {
      state.reduxEndDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getUsers cases
      .addCase(getLeaveManagementList.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(getLeaveManagementList.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.leaveManagementList = action.payload?.data;
        state.count = action?.payload?.count;
      })
      .addCase(getLeaveManagementList.rejected, (state) => {
        state.isLeaveLoading = false;
        state.leaveManagementList = [];
      });

    // Handle getComplaint by ID
    builder
      .addCase(getLeaveDataById.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(getLeaveDataById.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.leaveDataById = action?.payload?.data;
      })
      .addCase(getLeaveDataById.rejected, (state) => {
        state.isLeaveLoading = false;
        state.leaveDataById = {};
      });

    // Handle Change Status
    builder
      .addCase(changeLeaveStatusById.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(changeLeaveStatusById.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.changeLeaveStatus = action?.payload?.data;
      })
      .addCase(changeLeaveStatusById.rejected, (state) => {
        state.isLeaveLoading = false;
        state.changeLeaveStatus = {};
      });

    // Handle leave report
    builder
      .addCase(getLeaveReportSummary.pending, (state) => {
        state.isSummaryLoading = true;
      })
      .addCase(getLeaveReportSummary.fulfilled, (state, action) => {
        state.isSummaryLoading = false;
        state.leaveReportSummary = action?.payload?.data;
      })
      .addCase(getLeaveReportSummary.rejected, (state) => {
        state.isSummaryLoading = false;
        state.leaveReportSummary = {};
      });

    // Handle leave summary
    builder
      .addCase(getLeaveSummary.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(getLeaveSummary.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.leaveSummary = action?.payload?.data;
      })
      .addCase(getLeaveSummary.rejected, (state) => {
        state.isLeaveLoading = false;
        state.leaveSummary = {};
      });

    // get pass info
    builder
      .addCase(getPassInfo.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(getPassInfo.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.passInfo = action?.payload?.data;
      })
      .addCase(getPassInfo.rejected, (state) => {
        state.isLeaveLoading = false;
        state.leaveSummary = {};
      });
    // get currently out info
    builder
      .addCase(getCurrentlyOutInfo.pending, (state) => {
        state.isCurrentlyOutLoading = true;
      })
      .addCase(getCurrentlyOutInfo.fulfilled, (state, action) => {
        state.isCurrentlyOutLoading = false;
        state.currentlyOutInfo = action?.payload?.data;
      })
      .addCase(getCurrentlyOutInfo.rejected, (state) => {
        state.isCurrentlyOutLoading = false;
        state.leaveSummary = {};
      });

    // bulk update status
    builder
      .addCase(bulkUpdateStatus.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(bulkUpdateStatus.fulfilled, (state) => {
        state.isLeaveLoading = false;
      })
      .addCase(bulkUpdateStatus.rejected, (state) => {
        state.isLeaveLoading = false;
        state.leaveSummary = {};
      });

    builder
      .addCase(getLeaveManagementHistory.pending, (state) => {
        state.isLeaveHistory = true;
      })
      .addCase(getLeaveManagementHistory.fulfilled, (state, action) => {
        state.isLeaveHistory = false;
        state.historyData = action?.payload?.data;
        state.historyCount = action?.payload?.count;
      })
      .addCase(getLeaveManagementHistory.rejected, (state) => {
        state.isLeaveHistory = false;
        state.leaveSummary = {};
      });

    builder
      .addCase(exportLeaveReportAsync.pending, (state) => {
        state.isReportLoading = true;
        state.error = null;
      })
      .addCase(exportLeaveReportAsync.fulfilled, (state) => {
        state.isReportLoading = false;
      })
      .addCase(exportLeaveReportAsync.rejected, (state) => {
        state.isReportLoading = false;
      });

    // ========================== END ====================================
  },
});

// Export the reducer
export const { getReduxStartDate, getReduxEndDate } = leaveSlice.actions;
export default leaveSlice.reducer;
