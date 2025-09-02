import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const getAllHostelAsync = createAsyncThunk(
  "hostel/getHostelAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/hostel");
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getBedTypeAsync = createAsyncThunk(
  "hostel/getBedTypeAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/hostel/bedTypes", data);
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRoomNoAsync = createAsyncThunk(
  "hostel/getRoomNoAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/hostel/bed-type/rooms",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createResidentAsync = createAsyncThunk(
  "hostel/createResidentAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/user/create-resident",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateResidentAsync = createAsyncThunk(
  "hostel/updateResidentAsync",
  async ({id, data}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/user/update/${id}`,
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRoleListAsync = createAsyncThunk(
  "hostel/getRoleListAsync",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/role/exclude-superadmin");
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createStaffAsync = createAsyncThunk(
  "hostel/createStaffAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/staff/create-from-warden",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getHostelListAsync = createAsyncThunk(
  "hostel/getHostelListAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/staff/get-assign-hostel",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFloorByHostelAsync = createAsyncThunk(
  "hostel/getFloorByHostelAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/hostel/fetch-floor",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRoomsByFloorAndHostelAsync = createAsyncThunk(
  "hostel/getRoomsByFloorAndHostelAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/hostel/bed-type/rooms",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRoommatesAsync = createAsyncThunk(
  "hostel/getRoommatesAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/hostel/fetch-users",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateStaffAsync = createAsyncThunk(
  "hostel/updateStaffAsync",
  async ({id, updateData}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/staff/update/${id}`,
        updateData
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getBillingCycleAsync = createAsyncThunk(
  "hostel/getBillingCycle",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/hostel/payment-methods",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFloorNoByHostelIdAsync = createAsyncThunk(
  "hostel/getFloorNoByHostelId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/hostel/fetch-floor",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching Floor No.:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRoomNumberByFloorNumberAsync = createAsyncThunk(
  "hostel/getRoomNumberByFloorNumber",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/hostel/bed-type/rooms",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching Floor No.:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRoomsByMultipleFloorsAsync = createAsyncThunk(
  "hostel/getRoomsByMultipleFloorsAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/hostel/mupliple-floors/rooms",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching Floor No.:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);