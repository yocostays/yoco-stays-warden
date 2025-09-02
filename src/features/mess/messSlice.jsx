import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMess,
  createMessApi,
  fetchMessById,
  messBulkUpload,
  messReportSummary,
  messConsumedMeals,
  updateMessMeals,
  getAllMessApi,
  getMessDetailsByIdAPi,
  createFoodWastageApi,
  getFoodWastageDeatilListAsync,
  deleteFoodWastageAsync,
  getFoodWastageByIdAPi,
  updateFoodWastageApi,
  getMessReportSummaryApi,
  getFoodWastageReportApi,
  exportBookedMealReportApi,
  exportMessMenuReportApi,
  exportFoodWastageReportApi,
  fetchMessGatePassInfoApi,
  getActiveHostelDataApi,
  getUserByUniversityIdApi,
  getMissedBookingListApi,
  postManualMissedBookingApi,
  getMealBookingHistoryListApi,
  exportMissedBookingApi,
} from "./messApi";

// Define the initial state
const initialState = {
  totalCount: 0,
  totalDataCount: 0,
  missedBooikngCount: 0,
  totalFoodWastageCount: 0,
  getAllMessList: [], // Holds the fetched mess data
  getMessList: [], // Holds the fetched mess data
  summary: [],
  consumedMeals: [],
  getMealBookingHistoryList: [],
  getFoodWastageDeatilList: [],
  getMissedBookingList: [],
  createMessReportSummary: {},
  getMessGatePassInfo: {},
  getActiveHostelData: {},
  getFoodWastageReport: {},
  getMessDetailsById: {},
  foodWastageById: {},
  getUserByUniversityId: [],
  messById: {}, // Holds the fetched mess data
  loading: false, // Indicator for fetching status
  isLoading: false, // Indicator for fetching status
  submitting: false, // Indicator for submission status (when adding new data)
  isLoadingById: false,
  isSummaryLoading: false,
  isMessLoading: false,
  isHistoryLoading: false,
  isWastageLoading: false,
  isReportLoading: false,
  isGatePassLoading: false,
  isWastageDeleteLoading: false,
  isMissedLoading: false,
  isMissedBookingLoading: false,
  // isHistoryloading: false,
  error: null, // Holds error message, if any
};

// Thunk for fetching users
export const getAllMessListAsync = createAsyncThunk(
  "users/getUsers",
  async ({
    page,
    limit,
    status,
    mealType,
    sort,
    durationType,
    startDate,
    endDate,
    search,
    floorNumber,
    roomNumber,
  }) => {
    const data = await getAllMessApi(
      page,
      limit,
      status,
      mealType,
      sort,
      durationType,
      startDate,
      endDate,
      search,
      floorNumber,
      roomNumber
    );
    return data;
  }
);

export const getMessListAsync = createAsyncThunk(
  "mess/getMessList",
  async ({ page, limit, mealType, sort, startDate, endDate }) => {
    const data = await fetchMess(page, limit, mealType, sort, startDate, endDate); // Pass parameters to fetchMess
    return data;
  }
);

export const getMessById = createAsyncThunk("mess/getMessById", async (id) => {
  const data = await fetchMessById(id); // Pass parameters to fetchMess
  return data;
});

// Thunk for creating a new mess entry
export const createMessAPiAsync = createAsyncThunk(
  "mess/createMessAPi",
  async (newMessData) => {
    const data = await createMessApi(newMessData);
    return data;
  }
);

// Thunk for creating a new mess entry
export const postBulkUpload = createAsyncThunk(
  "mess/postBulkUpload",
  async (form) => {
    const data = await messBulkUpload(form);
    return data;
  }
);

// Thunk for getting mess summary
export const getMessReportSummary = createAsyncThunk(
  "mess/getMessReportSummary",
  async (summaryData) => {
    const data = await messReportSummary(summaryData);
    return data;
  }
);

// Thunk for getting consumed meals
export const getConsumedMeals = createAsyncThunk(
  "mess/getConsumedMeals",
  async (consumedData) => {
    const data = await messConsumedMeals(consumedData);
    return data;
  }
);

// Thunk for getting consumed meals
export const updateMessMealsAsync = createAsyncThunk(
  "mess/updateMessMeals",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const responseData = await updateMessMeals(data, id);
      return responseData;
    } catch (error) {
      console.error("Thunk error:", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || "Failed to update mess meals.");
      }
    }
  }
);

// Thunk for staff by Id
export const getMessDetailsByIdAsync = createAsyncThunk(
  "mess/getMessDetailsById",
  async (id) => {
    const data = await getMessDetailsByIdAPi(id);
    return data;
  }
);

// Thunk for creating wastage Entry
export const createFoodWastageAsync = createAsyncThunk(
  "mess/createFoodWastage",
  async (newData) => {
    const data = await createFoodWastageApi(newData);
    return data;
  }
);

// Thunk for staff by Id
export const getFoodWastageByIdAsync = createAsyncThunk(
  "mess/getFoodWastageById",
  async (id) => {
    const data = await getFoodWastageByIdAPi(id);
    return data;
  }
);

export const updateFoodWastageAsync = createAsyncThunk(
  "mess/updateFoodWastage",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const responseData = await updateFoodWastageApi(data, id);
      return responseData;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Thunk for creating wastage Entry
export const getMessReportSummaryAsync = createAsyncThunk(
  "mess/createMessReportSummary",
  async (newData) => {
    const data = await getMessReportSummaryApi(newData);
    return data;
  }
);

// Thunk for creating wastage Entry
export const getFoodWastageReportAsync = createAsyncThunk(
  "mess/getFoodWastageReport",
  async (newData) => {
    const data = await getFoodWastageReportApi(newData);
    return data;
  }
);

// Thunk for Getting Vacant Room
export const exportBookedMealReportAsync = createAsyncThunk(
  "mess/exportBookedMealReport",
  async (body) => {
    const data = await exportBookedMealReportApi(body);
    return data;
  }
);

// Thunk for Getting Vacant Room
export const exportMessMenuReportAsync = createAsyncThunk(
  "mess/exportMessMenuReport",
  async (body) => {
    const data = await exportMessMenuReportApi(body);
    return data;
  }
);

// Thunk for Getting Vacant Room
export const exportFoodWastageReportAsync = createAsyncThunk(
  "mess/exportFoodWastageReport",
  async (body) => {
    const data = await exportFoodWastageReportApi(body);
    return data;
  }
);

// Thunk for Getting Vacant Room
export const fetchMessGatePassInfoAsync = createAsyncThunk(
  "mess/fetchMessGatePassInfo",
  async (body) => {
    const data = await fetchMessGatePassInfoApi(body);
    return data;
  }
);

// Thunk for Getting Vacant Room
export const getActiveHostelDataAsync = createAsyncThunk(
  "mess/getActiveHostelData",
  async (body) => {
    const data = await getActiveHostelDataApi(body);
    return data;
  }
);

export const getUserByUniversityIdAsync = createAsyncThunk(
  "mess/getUserByUniversityId",
  async (body) => {
    const data = await getUserByUniversityIdApi(body);
    return data;
  }
);

export const getMissedBookingListAsync = createAsyncThunk(
  "mess/getMissedBookingList",
  async ({
    page,
    limit,
    status,
    mealStatus,
    sort,
    durationType,
    startDate,
    endDate,
    search,
    floorNumber,
    roomNumber,
  }) => {
    const data = await getMissedBookingListApi(
      page,
      limit,
      status,
      mealStatus,
      sort,
      durationType,
      startDate,
      endDate,
      search,
      floorNumber,
      roomNumber
    );
    return data;
  }
);

export const getMealBookingHistoryListAsync = createAsyncThunk(
  "mess/getMealBookingHistoryList",
  async ({ studentId, durationType, startDate, endDate }) => {
    const data = await getMealBookingHistoryListApi(
      studentId,
      durationType,
      startDate,
      endDate
    );
    return data;
  }
);

export const postManualMissedBookingAsync = createAsyncThunk(
  "mess/postManualMissedBooking",
  async (body) => {
    const data = await postManualMissedBookingApi(body);
    return data;
  }
);

export const exportMissedBookingApiAsync = createAsyncThunk(
  "mess/exportMissedBookingApi",
  async (body) => {
    const data = await exportMissedBookingApi(body);
    return data;
  }
);

const messSlice = createSlice({
  name: "mess",
  initialState,
  reducers: {
    clearWastageByIdState: (state) => {
      state.foodWastageById = {};
    },
    clearMessByIdState: (state) => {
      state.messById = {};
    },
    getReduxStartDate: (state, action) => {
      state.reduxStartDate = action.payload;
    },
    getReduxEndDate: (state, action) => {
      state.reduxEndDate = action.payload;
    },
    clearUserByUniversityId: (state) => {
      state.getUserByUniversityId = [];
    },
  },
  extraReducers: (builder) => {
    // Handling the getMessListAsync action states
    builder
      .addCase(getAllMessListAsync.pending, (state) => {
        state.isMessLoading = true;
        state.error = null;
      })
      .addCase(getAllMessListAsync.fulfilled, (state, action) => {
        state.isMessLoading = false;
        state.totalDataCount = action.payload.count;
        state.getAllMessList = action.payload.data;
      })
      .addCase(getAllMessListAsync.rejected, (state) => {
        state.isMessLoading = false;
        state.getAllMessList = [];
      });

    builder
      .addCase(getMessListAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMessListAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalCount = action.payload.count;
        state.getMessList = action.payload.data;
      })
      .addCase(getMessListAsync.rejected, (state) => {
        state.isLoading = false;
        state.getMessList = [];
      });

    // mess by ID
    builder
      .addCase(getMessById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessById.fulfilled, (state, action) => {
        state.loading = false;
        state.messById = action?.payload?.data;
      })
      .addCase(getMessById.rejected, (state) => {
        state.loading = false;
        state.messById = {};
      });

    // Handling the createMessAPiAsync action states
    builder
      .addCase(updateMessMealsAsync.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateMessMealsAsync.fulfilled, (state) => {
        state.submitting = false;
        state.messById = {};
      })
      .addCase(updateMessMealsAsync.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to create mess";
      });

    // Handling the createMessAPiAsync action states
    builder
      .addCase(createMessAPiAsync.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createMessAPiAsync.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createMessAPiAsync.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to create mess";
      });

    // handle bulk upload
    builder
      .addCase(postBulkUpload.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(postBulkUpload.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(postBulkUpload.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to create mess";
      });

    // handle mess report summary
    builder
      .addCase(getMessReportSummary.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(getMessReportSummary.fulfilled, (state, action) => {
        state.submitting = false;
        state.summary = action?.payload?.data;
      })
      .addCase(getMessReportSummary.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to create mess";
      });

    //getting consumed meals
    builder
      .addCase(getConsumedMeals.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(getConsumedMeals.fulfilled, (state, action) => {
        state.submitting = false;
        state.consumedMeals = action?.payload?.data;
      })
      .addCase(getConsumedMeals.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to create mess";
      });

    builder
      .addCase(getMessDetailsByIdAsync.pending, (state) => {
        state.isLoadingById = true;
        state.error = null;
      })
      .addCase(getMessDetailsByIdAsync.fulfilled, (state, action) => {
        state.isLoadingById = false;
        state.getMessDetailsById = action?.payload?.data;
      })
      .addCase(getMessDetailsByIdAsync.rejected, (state, action) => {
        state.isLoadingById = false;
        state.getMessDetailsById = {};
        state.error = action.error.message || "Failed to create mess";
      });

    builder
      .addCase(getMealBookingHistoryListAsync.pending, (state) => {
        state.isHistoryLoading = true;
        state.error = null;
      })
      .addCase(getMealBookingHistoryListAsync.fulfilled, (state, action) => {
        state.isHistoryLoading = false;
        state.getMealBookingHistoryList = action?.payload?.data;
      })
      .addCase(getMealBookingHistoryListAsync.rejected, (state, action) => {
        state.isHistoryLoading = false;
        state.getMealBookingHistoryList = [];
        state.error = action.error.message || "Failed to create mess";
      });

    builder
      .addCase(getFoodWastageDeatilListAsync.pending, (state) => {
        state.isWastageLoading = true;
        state.error = null;
      })
      .addCase(getFoodWastageDeatilListAsync.fulfilled, (state, action) => {
        state.isWastageLoading = false;
        state.totalFoodWastageCount = action.payload.count;
        state.getFoodWastageDeatilList = action?.payload?.data;
      })
      .addCase(getFoodWastageDeatilListAsync.rejected, (state, action) => {
        state.isWastageLoading = false;
        state.getFoodWastageDeatilList = [];
        state.error = action.error.message || "Failed to create mess";
      });

    // Handling the createFoodWastageAsync action states
    builder
      .addCase(createFoodWastageAsync.pending, (state) => {
        state.submitting = true;
        // state.error = null;
      })
      .addCase(createFoodWastageAsync.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createFoodWastageAsync.rejected, (state) => {
        state.submitting = false;
        // state.error = action.error.message || "Failed to create mess";
      });

    // Handling the deleteFoodWastageAsync action states
    builder
      .addCase(deleteFoodWastageAsync.pending, (state) => {
        state.isWastageDeleteLoading = true;
        state.error = null;
      })
      .addCase(deleteFoodWastageAsync.fulfilled, (state) => {
        state.isWastageDeleteLoading = false;
      })
      .addCase(deleteFoodWastageAsync.rejected, (state, action) => {
        state.isWastageDeleteLoading = false;
        state.error = action.error.message || "Failed to create mess";
      });

    // Handling the getFoodWastageByIdAPi action states
    builder
      .addCase(getFoodWastageByIdAsync.pending, (state) => {
        state.isLoadingById = true;
        state.error = null;
      })
      .addCase(getFoodWastageByIdAsync.fulfilled, (state, action) => {
        state.isLoadingById = false;
        state.foodWastageById = action?.payload?.data;
      })
      .addCase(getFoodWastageByIdAsync.rejected, (state) => {
        state.isLoadingById = false;
        state.foodWastageById = [];
      });

    builder
      .addCase(updateFoodWastageAsync.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateFoodWastageAsync.fulfilled, (state) => {
        state.submitting = false;
        state.foodWastageById = {};
      })
      .addCase(updateFoodWastageAsync.rejected, (state) => {
        state.submitting = false;
      });

    builder
      .addCase(getMessReportSummaryAsync.pending, (state) => {
        state.isSummaryLoading = true;
        state.error = null;
      })
      .addCase(getMessReportSummaryAsync.fulfilled, (state, action) => {
        state.isSummaryLoading = false;
        state.createMessReportSummary = action?.payload?.data;
      })
      .addCase(getMessReportSummaryAsync.rejected, (state) => {
        state.isSummaryLoading = false;
        state.createMessReportSummary = {};
      });

    builder
      .addCase(getFoodWastageReportAsync.pending, (state) => {
        state.isReportLoading = true;
        state.error = null;
      })
      .addCase(getFoodWastageReportAsync.fulfilled, (state, action) => {
        state.isReportLoading = false;
        state.getFoodWastageReport = action?.payload?.data;
      })
      .addCase(getFoodWastageReportAsync.rejected, (state) => {
        state.isReportLoading = false;
        state.getFoodWastageReport = {};
      });

    builder
      .addCase(exportBookedMealReportAsync.pending, (state) => {
        state.isReportLoading = true;
        state.error = null;
      })
      .addCase(exportBookedMealReportAsync.fulfilled, (state) => {
        state.isReportLoading = false;
      })
      .addCase(exportBookedMealReportAsync.rejected, (state) => {
        state.isReportLoading = false;
      });

    builder
      .addCase(exportMessMenuReportAsync.pending, (state) => {
        state.isReportLoading = true;
        state.error = null;
      })
      .addCase(exportMessMenuReportAsync.fulfilled, (state) => {
        state.isReportLoading = false;
      })
      .addCase(exportMessMenuReportAsync.rejected, (state) => {
        state.isReportLoading = false;
      });

    builder
      .addCase(exportFoodWastageReportAsync.pending, (state) => {
        state.isReportLoading = true;
        state.error = null;
      })
      .addCase(exportFoodWastageReportAsync.fulfilled, (state) => {
        state.isReportLoading = false;
      })
      .addCase(exportFoodWastageReportAsync.rejected, (state) => {
        state.isReportLoading = false;
      });

    builder
      .addCase(fetchMessGatePassInfoAsync.pending, (state) => {
        state.isGatePassLoading = true;
        state.error = null;
      })
      .addCase(fetchMessGatePassInfoAsync.fulfilled, (state, action) => {
        state.isGatePassLoading = false;
        state.getMessGatePassInfo = action?.payload?.data;
      })
      .addCase(fetchMessGatePassInfoAsync.rejected, (state) => {
        state.isGatePassLoading = false;
        state.getMessGatePassInfo = {};
      });

    builder
      .addCase(getActiveHostelDataAsync.pending, (state) => {
        state.isMissedBookingLoading = true;
        state.error = null;
      })
      .addCase(getActiveHostelDataAsync.fulfilled, (state, { payload }) => {
        state.isMissedBookingLoading = false;
        state.getActiveHostelData = payload?.data;
      })
      .addCase(getActiveHostelDataAsync.rejected, (state) => {
        state.isMissedBookingLoading = false;
        state.getActiveHostelData = {};
      });

    builder
      .addCase(getUserByUniversityIdAsync.pending, (state) => {
        state.isMissedLoading = true;
        state.error = null;
      })
      .addCase(getUserByUniversityIdAsync.fulfilled, (state, { payload }) => {
        state.isMissedLoading = false;
        state.getUserByUniversityId = payload?.data;
      })
      .addCase(getUserByUniversityIdAsync.rejected, (state) => {
        state.isMissedLoading = false;
        state.getUserByUniversityId = [];
      });

    builder
      .addCase(getMissedBookingListAsync.pending, (state) => {
        state.isMissedLoading = true;
        state.error = null;
      })
      .addCase(getMissedBookingListAsync.fulfilled, (state, { payload }) => {
        state.isMissedLoading = false;
        state.missedBooikngCount = payload?.count;
        state.getMissedBookingList = payload?.data;
      })
      .addCase(getMissedBookingListAsync.rejected, (state) => {
        state.isMissedLoading = false;
        state.getMissedBookingList = [];
      });

    builder
      .addCase(postManualMissedBookingAsync.pending, (state) => {
        state.isMissedBookingLoading = true;
        state.error = null;
      })
      .addCase(postManualMissedBookingAsync.fulfilled, (state) => {
        state.isMissedBookingLoading = false;
      })
      .addCase(postManualMissedBookingAsync.rejected, (state) => {
        state.isMissedBookingLoading = false;
      });
   
      builder
      .addCase(exportMissedBookingApiAsync.pending, (state) => {
        state.isMissedBookingLoading = true;
        state.error = null;
      })
      .addCase(exportMissedBookingApiAsync.fulfilled, (state) => {
        state.isMissedBookingLoading = false;
      })
      .addCase(exportMissedBookingApiAsync.rejected, (state) => {
        state.isMissedBookingLoading = false;
      });
  },
});

// Selectors to access the state
export const selectMess = (state) => state.mess.mess;
export const selectMessById = (state) => state.mess.messById;
export const selectLoading = (state) => state.mess.loading;
export const selectSubmitting = (state) => state.mess.submitting; // Selector for submission status
export const selectError = (state) => state.mess.error;

export const { clearWastageByIdState, clearMessByIdState,  getReduxStartDate, getReduxEndDate, clearUserByUniversityId } = messSlice.actions;
// Export the reducer
export default messSlice.reducer;
