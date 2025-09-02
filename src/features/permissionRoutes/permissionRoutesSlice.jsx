import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getPermittedRoutesAsync } from './permissionApi';

const initialState = {
    permittedRoutes: [],
    bedType: [],
    isLoading: false,
    roomNo: []
};

const permissionRoutesSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // all hostel
        builder.addMatcher(isAnyOf(getPermittedRoutesAsync.pending), (state,) => {
            state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(getPermittedRoutesAsync.fulfilled), (state, { payload }) => {
            state.permittedRoutes = payload?.data;
        });
        builder.addMatcher(isAnyOf(getPermittedRoutesAsync.rejected), (state) => {
            state.isLoading = false;
            state.permittedRoutes = [];
        });

    },
});

export default permissionRoutesSlice.reducer;
