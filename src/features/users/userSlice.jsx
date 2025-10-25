import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsers,
  fetchHostelList,
  fetchHostelBed,
  fetchHostelRoom,
  fetchVacantRoom,
  fetchUserDetail,
  detailsUserCard,
  fetchUserReportSummary,
  fetchStaffById,
  fetchTabsRole,
  fetchStaffRole,
  fetchStaffDetail,
  patchStaffById,
  changeStaffStatus,
  fetchUserById,
  fetchStaffForFamilyDetail,
  fetchStaffForVehicleDetail,
  fetchStaffForKycDetail,
  fetchStaffForIndisiplinaryDetail,
  fetchUserPersonalDetail,
  fetchUserFamilyDetail,
  fetchUserHostelDetail,
  fetchUserAcademicDetail,
  fetchUserKycDetail,
  fetchUserVehicleDetail,
  fetchUserIndisciplinaryDetail,
  exportUserReport,
  checkUserName,
} from "./userApi";
import { StaffSelection, StudentStatusEnum } from "@components/enums/usersListEnums";

// Define the initial state
const initialState = {
  count: [],
  totalCount: 0,
  staffCount: [],
  users: [],
  hostelList: [],
  userDetail: [],
  staffById: {},
  studentDetail: {},
  userReportSummary: [],
  tabsRole: [],
  staffRole: [],
  staffList: [],
  staffDetails: {},
  staffFamilyDetails: {},
  staffVehicleDetails: {},
  staffKycDetails: {},
  staffIndDetails: {},
  userPersonalDetail: {},
  userFamilyDetail: {},
  userHostelDetail: {},
  userAcademicDetail: {},
  userKycDetail: {},
  userVehicleDetail: {},
  userIndisciplinaryDetail: {},
  verifyUserName: false,
  loading: false,
  staffByIdLoading: false,
  submitting: false,
  isReportLoading: false,
  isUserLoading: false,
  error: null,
  staffSelection: StaffSelection?.HOSTEL_STUDENT,
  selectedTab: StudentStatusEnum[0]?.value,
  selectedAcademicOption: "",
  searchUser: "",
  sortUserFilter: "",
  studentPagination: 0,
  vehicleData: []
};

// Thunk for fetching users
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ page, limit, status, dateRange, search, sort, academicYear }) => {
    const data = await fetchUsers(page, limit, status, dateRange, search, sort, academicYear);
    return data;
  }
);

// get Role
export const getRole = createAsyncThunk("users/getRoles", async () => {
  const data = await fetchTabsRole();
  return data;
});

// Thunk for fetching users
export const getUsersDetail = createAsyncThunk(
  "users/getUsersDetail",
  async (body) => {
    const data = await fetchUserDetail(body);
    return data;
  }
);
// Thunk for fetching users
export const getUsersPersonalDetail = createAsyncThunk(
  "users/getUsersPersonalDetail",
  async (body) => {
    const data = await fetchUserPersonalDetail(body);
    return data;
  }
);
// Thunk for fetching users
export const getUsersFamilyDetail = createAsyncThunk(
  "users/getUsersFamilyDetail",
  async (body) => {
    const data = await fetchUserFamilyDetail(body);
    return data;
  }
);
// Thunk for fetching users
export const getUsersHostelDetail = createAsyncThunk(
  "users/getUsersHostelDetail",
  async (body) => {
    const data = await fetchUserHostelDetail(body);
    return data;
  }
);
// Thunk for fetching users
export const getUsersAcademicDetail = createAsyncThunk(
  "users/getUsersAcademicDetail",
  async (body) => {
    const data = await fetchUserAcademicDetail(body);
    return data;
  }
);
// Thunk for fetching users
export const getUsersKycDetail = createAsyncThunk(
  "users/getUsersKycDetail",
  async (body) => {
    const data = await fetchUserKycDetail(body);
    return data;
  }
);
// Thunk for fetching users
export const getUsersVehicleDetail = createAsyncThunk(
  "users/getUsersVehicleDetail",
  async (body) => {
    const data = await fetchUserVehicleDetail(body);
    return data;
  }
);
// Thunk for fetching users
export const getUsersIndisciplinaryDetail = createAsyncThunk(
  "users/getUsersIndisciplinaryDetail",
  async (body) => {
    const data = await fetchUserIndisciplinaryDetail(body);
    return data;
  }
);

// Thunk For fetching Staff role
export const getStaffRole = createAsyncThunk(
  "users/getStaffRole",
  async ({ page, limit, roles, status, dateRange, sort }) => {
    const data = await fetchStaffRole(
      page,
      limit,
      roles,
      status,
      dateRange,
      sort
    );
    return data;
  }
);

// Thunk For fetching Staff role
export const getStaffDetails = createAsyncThunk(
  "users/getStaffDetails",
  async (body) => {
    const data = await fetchStaffDetail(body);
    return data;
  }
);
// Thunk For fetching Staff role
export const getStaffFamilyDetails = createAsyncThunk(
  "users/getStaffFamilyDetails",
  async (body) => {
    const data = await fetchStaffForFamilyDetail(body);
    return data;
  }
);
// Thunk For fetching Staff role
export const getStaffVehicleDetails = createAsyncThunk(
  "users/getStaffVehicleDetails",
  async (body) => {
    const data = await fetchStaffForVehicleDetail(body);
    return data;
  }
);
// Thunk For fetching Staff role
export const getStaffKycDetails = createAsyncThunk(
  "users/getStaffKycDetails",
  async (body) => {
    const data = await fetchStaffForKycDetail(body);
    return data;
  }
);
// Thunk For fetching Staff role
export const getStaffIndisiplinaryDetails = createAsyncThunk(
  "users/getStaffIndisiplinaryDetails",
  async (body) => {
    const data = await fetchStaffForIndisiplinaryDetail(body);
    return data;
  }
);

// Thunk For fetching User detail
export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (id) => {
    const data = await fetchUserById(id);
    return data;
  }
);

// Thunk for fetching users
export const getCardDetail = createAsyncThunk(
  "users/getCardDetail",
  async (body) => {
    const data = await detailsUserCard(body);
    return data;
  }
);

// Thunk for fetching the assigned hostel list for User
export const getAssignedHostelList = createAsyncThunk(
  "users/getAssignedHostelList",
  async (_, thunkAPI) => {
    try {
      const data = await fetchHostelList();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch hostel list"
      );
    }
  }
);

// Assign Hostel To studen

// ====================== START ==================================

// Thunk for Getting Bed Type -------------
export const getHostelBedDetails = createAsyncThunk(
  "user/getHostelBedDetails",
  async (hostelId) => {
    const data = await fetchHostelBed(hostelId);
    return data;
  }
);

// Thunk for Getting Room Number according to Bed Type
export const getHostelRoomDetails = createAsyncThunk(
  "user/getHostelRoomDetails",
  async (body) => {
    const data = await fetchHostelRoom(body);
    return data;
  }
);

// Thunk for Getting Vacant Room
export const getVacantRoomDetails = createAsyncThunk(
  "user/getVacantRoomDetails",
  async (body) => {
    const data = await fetchVacantRoom(body);
    return data;
  }
);

// Thunk for Getting Vacant Room
export const getUserReportSummary = createAsyncThunk(
  "user/getUserReportSummary",
  async (body) => {
    const data = await fetchUserReportSummary(body);
    return data;
  }
);

// Thunk for staff by Id
export const getStaffDetailById = createAsyncThunk(
  "user/getStaffDetailById",
  async (id) => {
    const data = await fetchStaffById(id);
    return data;
  }
);

// Thunk for update staff by Id
export const updateStaffDetailById = createAsyncThunk(
  "user/updateStaffDetailById",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const responseData = await patchStaffById(data, id);
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

// export const updateStaffStatusAsync = createAsyncThunk(
//   "user/updateStaffStatusAsync",
//   async ({ data }, { rejectWithValue }) => {
//     try {
//       const responseData = await changeStaffStatus(data);
//       return responseData;
//     } catch (error) {
//       console.error("Thunk error:", error);
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message || "Failed to update mess meals.");
//       }
//     }
//   }
// );

export const updateStaffStatusAsync = createAsyncThunk(
  "user/updateStaffStatus",
  async (newData) => {
    const data = await changeStaffStatus(newData);
    return data;
  }
);

// Thunk for Getting Vacant Room
export const exportUserReportAsync = createAsyncThunk(
  "user/exportUserReport",
  async (body) => {
    const data = await exportUserReport(body);
    return data;
  }
);

// Thunk for Getting Vacant Room
export const checkUserNameAsync = createAsyncThunk(
  "user/checkUserName",
  async (body) => {
    const data = await checkUserName(body);
    return data;
  }
);

// ====================== END ====================================

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserName: (state) => {
      state.verifyUserName = false;
    },
    setStaffSelection: (state, action) => {
      state.staffSelection = action?.payload
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action?.payload
    },
    setSelectedAcademicOption: (state, action) => {
      state.selectedAcademicOption = action?.payload
    },
    setSearch: (state, action) => {
      state.searchUser = action?.payload
    },
    setSortUserFilter: (state, action) => {
      state.sortUserFilter = action?.payload
    },
    setStudentPagination: (state, action) => {
      state.studentPagination = action?.payload
    },
    setVehicleData: (state, action) => {
      console.log(action, "action")
      state.vehicleData.push(action.payload);
    },
    updateVehicleData: (state, action) => {      
      state.vehicleData[action.payload?.index] = {
        ...state.vehicleData[action.payload?.index],
        ...action.payload
      };
    },

    removeVehicleData: (state, action) => {
      const index = action.payload; // payload = index to remove
      if (index >= 0 && index < state.vehicleData.length) {
        state.vehicleData.splice(index, 1); // removes 1 item at index
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getUsers cases
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action?.payload;
        state.totalCount = action?.payload?.count?.userCount;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.users = [];
      });

    //get tabs role
    builder
      // Handle getUsers cases
      .addCase(getRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.loading = false;
        state.tabsRole = action?.payload?.data;
        state.count = action?.payload?.count;
      })
      .addCase(getRole.rejected, (state) => {
        state.loading = false;
        state.tabsRole = [];
      });

    // Handle get detail of specefic user
    builder
      .addCase(getUsersDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload.data || [];
      })
      .addCase(getUsersDetail.rejected, (state) => {
        state.loading = false;
        state.userDetail = [];
      });

    // Handle get detail of specefic user
    builder
      .addCase(getUsersPersonalDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersPersonalDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userPersonalDetail = action.payload.data;
      })
      .addCase(getUsersPersonalDetail.rejected, (state) => {
        state.loading = false;
        state.userPersonalDetail = {};
      });

    // Handle get detail of specefic user
    builder
      .addCase(getUsersFamilyDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersFamilyDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userFamilyDetail = action.payload.data;
      })
      .addCase(getUsersFamilyDetail.rejected, (state) => {
        state.loading = false;
        state.userFamilyDetail = {};
      });

    // Handle get detail of specefic user
    builder
      .addCase(getUsersHostelDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersHostelDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userHostelDetail = action.payload.data;
      })
      .addCase(getUsersHostelDetail.rejected, (state) => {
        state.loading = false;
        state.userHostelDetail = {};
      });

    // Handle get detail of specefic user
    builder
      .addCase(getUsersAcademicDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersAcademicDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userAcademicDetail = action.payload.data;
      })
      .addCase(getUsersAcademicDetail.rejected, (state) => {
        state.loading = false;
        state.userAcademicDetail = {};
      });
    // Handle get detail of specefic user
    builder
      .addCase(getUsersKycDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersKycDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userKycDetail = action.payload.data;
      })
      .addCase(getUsersKycDetail.rejected, (state) => {
        state.loading = false;
        state.userKycDetail = {};
      });
    // Handle get detail of specefic user
    builder
      .addCase(getUsersVehicleDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersVehicleDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userVehicleDetail = action.payload.data;
      })
      .addCase(getUsersVehicleDetail.rejected, (state) => {
        state.loading = false;
        state.userVehicleDetail = {};
      });
    // Handle get detail of specefic user
    builder
      .addCase(getUsersIndisciplinaryDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersIndisciplinaryDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userIndisciplinaryDetail = action.payload.data;
      })
      .addCase(getUsersIndisciplinaryDetail.rejected, (state) => {
        state.loading = false;
        state.userIndisciplinaryDetail = {};
      });

    // Handle get detail of specefic staff
    builder
      .addCase(getStaffDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaffDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.staffDetails = action.payload.data || [];
      })
      .addCase(getStaffDetails.rejected, (state) => {
        state.loading = false;
        state.staffDetails = [];
      });
    // Handle get detail of specefic staff
    builder
      .addCase(getStaffFamilyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaffFamilyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.staffFamilyDetails = action.payload.data || [];
      })
      .addCase(getStaffFamilyDetails.rejected, (state) => {
        state.loading = false;
        state.staffFamilyDetails = {};
      });
    // Handle get detail of specefic staff
    builder
      .addCase(getStaffVehicleDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaffVehicleDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.staffVehicleDetails = action.payload.data || [];
      })
      .addCase(getStaffVehicleDetails.rejected, (state) => {
        state.loading = false;
        state.staffVehicleDetails = {};
      });
    // Handle get detail of specefic staff
    builder
      .addCase(getStaffKycDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaffKycDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.staffKycDetails = action.payload.data || [];
      })
      .addCase(getStaffKycDetails.rejected, (state) => {
        state.loading = false;
        state.staffKycDetails = {};
      });
    // Handle get detail of specefic staff
    builder
      .addCase(getStaffIndisiplinaryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaffIndisiplinaryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.staffIndDetails = action.payload.data || [];
      })
      .addCase(getStaffIndisiplinaryDetails.rejected, (state) => {
        state.loading = false;
        state.staffIndDetails = {};
      });

    // Get staff role
    builder
      .addCase(getStaffRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaffRole.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action?.payload?.data || [];
        state.staffCount = action?.payload?.count;
      })
      .addCase(getStaffRole.rejected, (state) => {
        state.loading = false;
        state.staffList = [];
      });

    // Handle getAssignedHostelList for staff cases
    builder
      .addCase(getAssignedHostelList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssignedHostelList.fulfilled, (state, action) => {
        state.loading = false;
        state.hostelList = action.payload.data || [];
      })
      .addCase(getAssignedHostelList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to fetch hostel list";
      });

    // Assign Hostel To student

    // ====================== START ==================================
    // Handle getHostelBedDeatils cases
    builder
      .addCase(getHostelBedDetails.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(getHostelBedDetails.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(getHostelBedDetails.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to Get Bed Detail";
      });

    // Handle getHostelRoomDeatils cases
    builder
      .addCase(getHostelRoomDetails.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(getHostelRoomDetails.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(getHostelRoomDetails.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to Get Room Detail";
      });

    // Handle getVacanrRoom cases
    builder
      .addCase(getVacantRoomDetails.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(getVacantRoomDetails.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(getVacantRoomDetails.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to Get Vacant room";
      });

    // ====================== END ====================================

    // Handle details cases
    builder
      .addCase(getCardDetail.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(getCardDetail.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(getCardDetail.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to Get Vacant room";
      });

    // Handle User Report Summary
    builder
      .addCase(getUserReportSummary.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(getUserReportSummary.fulfilled, (state, action) => {
        state.submitting = false;
        state.userReportSummary = action.payload.data;
      })
      .addCase(getUserReportSummary.rejected, (state, action) => {
        state.submitting = false;
        state.userReportSummary = [];
        state.error = action.error.message || "Failed to Get Vacant room";
      });

    // handle staff by id
    builder
      .addCase(getStaffDetailById.pending, (state) => {
        state.staffByIdLoading = true;
        state.error = null;
      })
      .addCase(getStaffDetailById.fulfilled, (state, action) => {
        state.staffByIdLoading = false;
        state.staffById = action.payload.data;
      })
      .addCase(getStaffDetailById.rejected, (state) => {
        state.staffByIdLoading = false;
        state.staffById = {};
      });

    // handle user by id
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.staffByIdLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.staffByIdLoading = false;
        state.studentDetail = action.payload.data;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.staffByIdLoading = false;
        state.studentDetail = {};
      });

    builder
      .addCase(updateStaffDetailById.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateStaffDetailById.fulfilled, (state, action) => {
        state.submitting = false;
        state.staffById = action.payload.data || [];
      })
      .addCase(updateStaffDetailById.rejected, (state) => {
        state.submitting = false;
        state.staffById = [];
      });

    builder
      .addCase(updateStaffStatusAsync.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateStaffStatusAsync.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateStaffStatusAsync.rejected, (state) => {
        state.submitting = false;
      });

    builder
      .addCase(exportUserReportAsync.pending, (state) => {
        state.isReportLoading = true;
        state.error = null;
      })
      .addCase(exportUserReportAsync.fulfilled, (state) => {
        state.isReportLoading = false;
      })
      .addCase(exportUserReportAsync.rejected, (state) => {
        state.isReportLoading = false;
      });

    builder
      .addCase(checkUserNameAsync.pending, (state) => {
        state.error = null;
        state.isUserLoading = true;
        state.verifyUserName = false;
      })
      .addCase(checkUserNameAsync.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.verifyUserName = action.payload.data;
      })
      .addCase(checkUserNameAsync.rejected, (state) => {
        state.isUserLoading = false;
        state.verifyUserName = false;
      });
  },
});

// Selectors to get users, loading, and error state
export const selectUsers = (state) => state.users.users;
export const selectStaffById = (state) => state.users.staffById;
export const selectHostelList = (state) => state.users.hostelList;
export const selectUserDetail = (state) => state.users.userDetail;
export const selectLoading = (state) => state.users.loading;
export const selectStaffByIdLoading = (state) => state.users.staffByIdLoading;
export const selectError = (state) => state.users.error;

export const { clearUserName, setStaffSelection, removeVehicleData, updateVehicleData, setVehicleData, setSelectedTab, setSelectedAcademicOption, setSearch, setSortUserFilter, setStudentPagination } = usersSlice.actions;
// Export the reducer
export default usersSlice.reducer;
