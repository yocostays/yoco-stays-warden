import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const getStaffAsync = createAsyncThunk(
  "staff/getStaffAsync",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/staff/all", {
        params,
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createStaffAsync = createAsyncThunk(
  "staff/createStaffAsync",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/staff/create-from-warden", {
        params,
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getStaffDetailAsync = createAsyncThunk(
  "staff/getStaffDetailAsync",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/staff/${id}`, {});
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
