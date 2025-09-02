import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const getCoursesAsync = createAsyncThunk(
  "university/getCoursesAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/university/courses", data);
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
