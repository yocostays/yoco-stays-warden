import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissionMenu: [],
  routePermission: [],
  modulePermit: {},
};

export const menuPermissionSlice = createSlice({
  name: "menuPermission",
  initialState,
  reducers: {
    storePermission: (state, action) => {
      state.permissionMenu = action.payload;
    },
    storeRoutePermission: (state, action) => {
      state.routePermission = action.payload;
    },
    storeModulePermit: (state, action) => {
      state.modulePermit = action.payload;
    },
  },
});

export const { storePermission, storeRoutePermission, storeModulePermit } =
  menuPermissionSlice.actions;

export default menuPermissionSlice.reducer;
