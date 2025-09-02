import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchComplaint,
  fetchComplaintById,
  fetchMaintenanceReport,
  fetchStaff,
  fetchTopComplaint,
  getIndividualComplaintAsync,
  updateComplaintStatus,
  updateStaff,
} from "./maintenanceApi";

const initialState = {
  complaint: [],
  complaintById: [],
  topComplaint: [],
  staff: [],
  maintenanceSummary: [],
  loading: false,
  individualComplaintLoading: false,
  submitting: false,
  count: 0,
  historyCount:0,
  error: null,
};

// Thunk for fetching complaints
export const getComplaint = createAsyncThunk(
  "complaint/getComplaint",
  async ({ page, limit, status }) => {
    const data = await fetchComplaint(page, limit, status);
    return data;
  }
);

// Thunk for fetching complaints by id
export const getComplaintById = createAsyncThunk(
  "complaint/getComplaintById",
  async (id) => {
    const data = await fetchComplaintById(id); // Pass parameters to fetchMess
    return data;
  }
);

// Thunk for fetching complaints by id
export const getStaff = createAsyncThunk("complaint/getStaff", async () => {
  const data = await fetchStaff(); // Pass parameters to fetchMess
  return data;
});

// Thunk for fetching Top complaints
export const getTopComplain = createAsyncThunk(
  "complaint/getTopComplain",
  async () => {
    const data = await fetchTopComplaint(); // Pass parameters to fetchMess
    return data;
  }
);

// Thunk for fetching Miantenance report
export const getMaintenanceReport = createAsyncThunk(
  "complaint/getMaintenanceReport",
  async () => {
    const data = await fetchMaintenanceReport(); // Pass parameters to fetchMess
    return data;
  }
);

// Thunk for updating complaint status
export const updateComplaintStatusThunk = createAsyncThunk(
  "complaint/updateStatus",
  async (data) => {
    const response = await updateComplaintStatus(data);
    return response; // Return the updated data or status
  }
);
// Thunk for updating complaint status
export const updateStaffThunk = createAsyncThunk(
  "complaint/updateStaff",
  async (data) => {
    const response = await updateStaff(data);
    return response; // Return the updated data or status
  }
);
// Thunk for updating complaint status
export const getIndividualComplaint = createAsyncThunk(
  "complaint/getIndividualComplaint",
  async (data) => {
    const response = await getIndividualComplaintAsync(data);
    return response; // Return the updated data or status
  }
);

const maintenanceSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getComplaint cases
      .addCase(getComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.complaint = [];
      })
      .addCase(getComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.complaint = action.payload?.data;
        state.count = action.payload?.count || 0;
      })
      .addCase(getComplaint.rejected, (state) => {
        state.loading = false;
        state.complaint = [];
      });

    //Handle getComplaint by ID
    builder
      .addCase(getComplaintById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintById.fulfilled, (state, action) => {
        state.loading = false;
        state.complaintById = action?.payload?.data;
      })
      .addCase(getComplaintById.rejected, (state) => {
        state.loading = false;
        state.complaintById = [];
      });

    //Handle getTopComplaint
    builder
      .addCase(getTopComplain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopComplain.fulfilled, (state, action) => {
        state.loading = false;
        state.topComplaint = action?.payload?.data;
      })
      .addCase(getTopComplain.rejected, (state) => {
        state.loading = false;
        state.topComplaint = [];
      });

    //Handle getMaintenanceSummary
    builder
      .addCase(getMaintenanceReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMaintenanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.maintenanceSummary = action?.payload?.data;
      })
      .addCase(getMaintenanceReport.rejected, (state) => {
        state.loading = false;
        state.maintenanceSummary = [];
      });

    // Handle getStaff cases
    builder
      .addCase(getStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.staff = [];
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload?.data;
        state.count = action.payload?.count || 0;
      })
      .addCase(getStaff.rejected, (state) => {
        state.loading = false;
        state.staff = [];
      });

    // Handle updateComplaintStatus cases
    builder
      .addCase(updateStaffThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateStaffThunk.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateStaffThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error =
          action.error.message || "Failed to update complaint status";
      });

    // Handle updateStaffS cases
    builder
      .addCase(updateComplaintStatusThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateComplaintStatusThunk.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateComplaintStatusThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error =
          action.error.message || "Failed to update complaint status";
      });
    // Handle updateStaffS cases
    builder
      .addCase(getIndividualComplaint.pending, (state) => {
        state.individualComplaintLoading = true;
        state.error = null;
      })
      .addCase(getIndividualComplaint.fulfilled, (state, {payload}) => {
        state.individualComplaintLoading = false;
        state.individualComplaint = payload?.data;
        state.historyCount = payload?.count;
      })
      .addCase(getIndividualComplaint.rejected, (state, action) => {
        state.individualComplaintLoading = false;
        state.error =
          action.error.message || "Failed to update complaint status";
      });
  },
});

// Selectors to get complaint list, loading, count, and error state
export const selectComplaintList = (state) => state.complaint.complaint;
export const selectComplaintListById = (state) => state.complaint.complaintById;
export const selectComplaintLoading = (state) => state.complaint.loading;
export const selectComplaintCount = (state) => state.complaint.count;
export const selectComplaintError = (state) => state.complaint.error;
export const selectComplaintSubmitting = (state) => state.complaint.submitting;

// Export the reducer
export default maintenanceSlice.reducer;
