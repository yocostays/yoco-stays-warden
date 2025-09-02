import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export const getAllMessApi = async (
  page = 1,
  limit = 10,
  status,
  mealType,
  sort,
  durationType,
  startDate,
  endDate,
  search,
  floorNumber,
  roomNumber,
) => {
  try {
    const response = await axiosInstance.get("/api/mess/details", {
      params: {
        page,
        limit,
        status,
        mealType,
        sort,
        durationType,
        startDate,
        endDate,
        search,
        floorNumber,
        roomNumber,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchMess = async (
  page = 1,
  limit = 10,
  mealType,
  sort,
  startDate, 
  endDate,
) => {
  try {
    const response = await axiosInstance.get("/api/mess", {
      params: {
        page,
        limit,
        mealType,
        sort,
        startDate,
        endDate 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const fetchMessById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/mess/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const createMessApi = async (data) => {
  try {
    const response = await axiosInstance.post("/api/mess/create", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const messBulkUpload = async (data) => {
  try {
    const response = await axiosInstance.post("/api/mess/bulk-upload", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// mess report summary
export const messReportSummary = async (data) => {
  try {
    const response = await axiosInstance.post("/api/mess-report/summary", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// mess consumption details
export const messConsumedMeals = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/mess-report/consumed-meals",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const deleteMessAsync = createAsyncThunk(
  "mess/deleteMessAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/api/mess/delete", { data });
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// mess update meals
export const updateMessMeals = async (updateData, id) => {
  try {
    // Send the request with id as a URL parameter and data as the body
    const response = await axiosInstance.patch(
      `/api/mess/update/${id}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating mess meals:", error);
    throw error;
  }
};

// Get Mess Details By Id
export const getMessDetailsByIdAPi = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/mess/book-meal/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const getMealBookingHistoryListApi = async (
  studentId,
  durationType,
  startDate,
  endDate,
) => {
  try {
    const response = await axiosInstance.get("/api/mess/book-meal/individual", {
      params: {
        studentId,
        durationType,
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};


export const getFoodWastageDeatilListAsync = createAsyncThunk(
  "mess/getFoodWastageDeatilList",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/food-wastage", {
        params,
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createFoodWastageApi = async (data) => {
  try {
    const response = await axiosInstance.post("/api/food-wastage/create", data);
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// delete FoodWastage
export const deleteFoodWastageAsync = createAsyncThunk(
  "mess/deleteFoodWastageAsync",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/food-wastage/delete/${id}`
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching hostels:", error);
      toast.error(error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Food Wastage By Id
export const getFoodWastageByIdAPi = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/food-wastage/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// update FoodWastage
export const updateFoodWastageApi = async (data, id) => {
  try {
    // Send the request with id as a URL parameter and data as the body
    const response = await axiosInstance.patch(
      `/api/food-wastage/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.error("Error updating mess meals:", error);
    throw error;
  }
};

export const getMessReportSummaryApi = async (data) => {
  try {
    const response = await axiosInstance.post("/api/mess-report/summary", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const getFoodWastageReportApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/food-wastage-report/graph",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// Export Excell exportBookedMealReport
export const exportBookedMealReportApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/mess-report/book-meal/export",
      data
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// Export Excell exportMessMenuReport
export const exportMessMenuReportApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/mess-report/mess-menu/export",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// Export Excell exportFoodWastageReportApi
export const exportFoodWastageReportApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/food-wastage-report/export",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const fetchMessGatePassInfoApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/mess/get-gatepass-info",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const getActiveHostelDataApi = async (data) => {
  try {
    const response = await axiosInstance.post("/api/staff/active-hostel", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const getUserByUniversityIdApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/user/hostel-academic",
      data
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const getMissedBookingListApi = async (
  page = 1,
  limit = 10,
  status,
  mealStatus,
  sort,
  durationType,
  startDate,
  endDate,
  search,
  floorNumber,
  roomNumber,
) => {
  try {
    const response = await axiosInstance.get("/api/mess/missed-booking", {
      params: {
        page,
        limit,
        status,
        mealStatus,
        sort,
        durationType,
        startDate,
        endDate,
        search,
        floorNumber,
        roomNumber,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};


export const postManualMissedBookingApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/mess/booked/manual",
      data
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// Export Excell exportMissedBookingApi
export const exportMissedBookingApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "api/mess-report/missed-booking/export",
      data
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};