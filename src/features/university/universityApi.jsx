import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchUniversity = async (
    page = 1,
    limit = 10,
    search = "",
  ) => {
    try {
      const response = await axiosInstance.get("/api/university", {
        params: {
          page: page,
          limit: limit,
          search: search,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching university:", error);
      throw error;
    }
  };
export const getUniversityListAsync = async (
  ) => {
    try {
      const response = await axiosInstance.post("/api/university/list", {
        params: {},
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching university:", error);
      throw error;
    }
  };
