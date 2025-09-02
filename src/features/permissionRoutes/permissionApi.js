import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const getPermittedRoutesAsync = createAsyncThunk('permission/getPermittedRoutesAsync', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/permission', data);
        return response?.data;
    } catch (error) {
        console.error("Error fetching permitted routes:", error);
        return rejectWithValue(error.response?.data || error.message);
    }
});