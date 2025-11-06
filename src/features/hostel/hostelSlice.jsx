import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllHostelAsync,
  getBedTypeAsync,
  getRoomNoAsync,
  getRoleListAsync,
  createStaffAsync,
  getHostelListAsync,
  getFloorByHostelAsync,
  getRoomsByFloorAndHostelAsync,
  getRoommatesAsync,
  createResidentAsync,
  updateStaffAsync,
  updateResidentAsync,
  getBillingCycleAsync,
  getFloorNoByHostelIdAsync,
  getRoomNumberByFloorNumberAsync,
  getRoomsByMultipleFloorsAsync,
  getFloorsRooms
} from "./hostelApi";

const initialState = {
  allHostel: [],
  bedType: [],
  loading: false,
  isFloorRoomLoading: false,
  isSubmitting: false,
  isLoading: false,
  isFloorLoading: false,
  isRoomLoading: false,
  roomNo: [],
  roleList: [],
  hostelList: [],
  floorList: [],
  roomList: [],
  roomMates: [],
  getBillingCycle: [],
  getFloorNoByHostelId: [],
  getRoomNumberByFloorNumber: [],
  roomsListByMultipleFloors: [],
  floorRooms: []
};

const hostelDetailSlice = createSlice({
  name: "hostel",
  initialState,
  reducers: {
    clearRoomDetails(state) {
      state.roomNo = [];
    },
    ClearSelectedFloorDetails(state) {
      state.getFloorNoByHostelId = [];
      state.getRoomNumberByFloorNumber = [];
    },
    ClearSelectedRoomDetails(state) {
      // state.getFloorNoByHostelId = [];
      state.getRoomNumberByFloorNumber = [];
    }
  },
  extraReducers: (builder) => {
    // all hostel
    builder.addMatcher(
      isAnyOf(getAllHostelAsync.fulfilled),
      (state, { payload }) => {
        state.allHostel = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getAllHostelAsync.rejected), (state) => {
      state.isLoading = false;
      state.allHostel = [];
    });

    // bed type
    builder.addMatcher(
      isAnyOf(getBedTypeAsync.fulfilled),
      (state, { payload }) => {
        state.bedType = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getBedTypeAsync.rejected), (state) => {
      state.bedType = [];
    });

    // room number
    builder.addMatcher(isAnyOf(getRoomNoAsync.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(getRoomNoAsync.fulfilled),
      (state, { payload }) => {
        state.loading = false;
        state.roomNo = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getRoomNoAsync.rejected), (state) => {
      state.loading = false;
      state.roomNo = [];
    });

    // room number
    builder.addMatcher(isAnyOf(getRoleListAsync.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(getRoleListAsync.fulfilled),
      (state, { payload }) => {
        state.loading = false;
        state.roleList = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getRoleListAsync.rejected), (state) => {
      state.loading = false;
      state.roleList = [];
    });

    // room number
    builder.addMatcher(isAnyOf(getRoleListAsync.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(getRoleListAsync.fulfilled),
      (state, { payload }) => {
        state.loading = false;
        state.roleList = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getRoleListAsync.rejected), (state) => {
      state.loading = false;
      state.roleList = [];
    });

    // staff creation
    builder.addMatcher(isAnyOf(createStaffAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(createStaffAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(createStaffAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    // hostel list by warden
    builder.addMatcher(isAnyOf(getHostelListAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(getHostelListAsync.fulfilled), (state, { payload }) => {
      state.isSubmitting = false;
      state.hostelList = payload?.data
    });
    builder.addMatcher(isAnyOf(getHostelListAsync.rejected), (state) => {
      state.isSubmitting = false;
      state.hostelList = []
    });

    // Floor by hostel id
    builder.addMatcher(isAnyOf(getFloorByHostelAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getFloorByHostelAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.floorList = payload?.data
    });
    builder.addMatcher(isAnyOf(getFloorByHostelAsync.rejected), (state) => {
      state.isLoading = false;
      state.floorList = []
    });

    // Room by hostel id and floor
    builder.addMatcher(isAnyOf(getRoomsByFloorAndHostelAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getRoomsByFloorAndHostelAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.roomList = payload?.data
    });
    builder.addMatcher(isAnyOf(getRoomsByFloorAndHostelAsync.rejected), (state) => {
      state.isLoading = false;
      state.roomList = []
    });

    // Get roommates
    builder.addMatcher(isAnyOf(getRoommatesAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getRoommatesAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.roomMates = payload?.data
    });
    builder.addMatcher(isAnyOf(getRoommatesAsync.rejected), (state) => {
      state.isLoading = false;
      state.roomMates = []
    });

    // Create residence
    builder.addMatcher(isAnyOf(createResidentAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(createResidentAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(createResidentAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    // Create residence
    builder.addMatcher(isAnyOf(updateResidentAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(updateResidentAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(updateResidentAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    // Create residence
    builder.addMatcher(isAnyOf(updateStaffAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(updateStaffAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(updateStaffAsync.rejected), (state) => {
      state.isSubmitting = false;
    });
    // ===================

    // Create residence
    builder.addMatcher(isAnyOf(getBillingCycleAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(getBillingCycleAsync.fulfilled), (state, { payload }) => {
      state.isSubmitting = false;
      state.getBillingCycle = payload?.data
    });
    builder.addMatcher(isAnyOf(getBillingCycleAsync.rejected), (state) => {
      state.isSubmitting = false;
    });
    // ===================

    // getFloorNoByHostelIdAsync
    builder.addMatcher(isAnyOf(getFloorNoByHostelIdAsync.pending), (state) => {
      state.isFloorLoading = true;
    });
    builder.addMatcher(isAnyOf(getFloorNoByHostelIdAsync.fulfilled), (state, { payload }) => {
      state.isFloorLoading = false;
      state.getFloorNoByHostelId = payload?.data
    });
    builder.addMatcher(isAnyOf(getFloorNoByHostelIdAsync.rejected), (state) => {
      state.isFloorLoading = false;
    });
    // ===================

    // getRoomNumberByFloorNumberAsync
    builder.addMatcher(isAnyOf(getRoomNumberByFloorNumberAsync.pending), (state) => {
      state.isRoomLoading = true;
    });
    builder.addMatcher(isAnyOf(getRoomNumberByFloorNumberAsync.fulfilled), (state, { payload }) => {
      state.isRoomLoading = false;
      state.getRoomNumberByFloorNumber = payload?.data
    });
    builder.addMatcher(isAnyOf(getRoomNumberByFloorNumberAsync.rejected), (state) => {
      state.isRoomLoading = false;
    });
    // ===================

    // getRoomsByMultipleFloorsAsync
    builder.addMatcher(isAnyOf(getRoomsByMultipleFloorsAsync.pending), (state) => {
      state.isFloorRoomLoading = true;
    });
    builder.addMatcher(isAnyOf(getRoomsByMultipleFloorsAsync.fulfilled), (state, { payload }) => {
      state.isFloorRoomLoading = false;
      state.getRoomNumberByFloorNumber = payload?.data
    });
    builder.addMatcher(isAnyOf(getRoomsByMultipleFloorsAsync.rejected), (state) => {
      state.isFloorRoomLoading = false;
    });

    // getFloorsRooms
    builder.addMatcher(isAnyOf(getFloorsRooms.pending), (state) => {
      state.isFloorRoomLoading = true;
    });

    builder.addMatcher(isAnyOf(getFloorsRooms.fulfilled), (state, { payload }) => {
      console.log("Reducer payload", payload);
      state.isFloorRoomLoading = false;
      state.floorRooms = payload;
    });

    builder.addMatcher(isAnyOf(getFloorsRooms.rejected), (state) => {
      state.isFloorRoomLoading = false;
    });
    // ===================
  },
});

export const { clearRoomDetails, ClearSelectedFloorDetails, ClearSelectedRoomDetails } = hostelDetailSlice.actions;
export default hostelDetailSlice.reducer;
