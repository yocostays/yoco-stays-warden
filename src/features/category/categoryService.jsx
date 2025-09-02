import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const getCategoryAsync = createAsyncThunk(
  "university/getCategoryAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/complaint-category" , data);
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
