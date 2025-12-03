import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchUsers = async (
  page = 1,
  limit = 10,
  status = "all",
  dateRange,
  search,
  sort,
  academicYear
) => {
  try {

    const response = await axiosInstance.get("/api/user", {
      params: {
        page,
        limit,
        status,
        dateRange,
        search,
        sort,
        academicYear
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchStaffRole = async (
  page = 1,
  limit = 10,
  roles,
  status = "all",
  search,
  sort,
  dateRange
) => {
  try {
    console.log(search, "search");
    const response = await axiosInstance.get("/api/staff", {
      params: {
        page,
        limit,
        roles,
        status,
        search,
        sort,
        dateRange,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchTabsRole = async () => {
  try {
    const response = await axiosInstance.post("/api/role/warden-access");
    return response.data;
  } catch (error) {
    console.error("Error fetching Role:", error);
    throw error;
  }
};

export const fetchUserDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchUserPersonalDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchUserFamilyDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchUserHostelDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchUserAcademicDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchUserKycDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchUserVehicleDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchUserIndisciplinaryDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const fetchStaffDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/staff/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchStaffForFamilyDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/staff/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchStaffForVehicleDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/staff/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchStaffForKycDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/staff/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
export const fetchStaffForIndisiplinaryDetail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/staff/profile/type", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const fetchHostelList = async () => {
  try {
    const response = await axiosInstance.post("/api/staff/get-assign-hostel");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// asign hostel api hits
// ---------------------- Start ----------------------------------------

export const fetchHostelBed = async (data) => {
  try {
    const response = await axiosInstance.post("/api/hostel/bedTypes", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const fetchHostelRoom = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/hostel/bed-type/rooms",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const fetchVacantRoom = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/hostel/vacant-room-details",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// ---------------------- END ------------------------------------------

export const detailsUserCard = async () => {
  try {
    const response = await axiosInstance.post("/api/user-report");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// User Report For Pie-Chart
export const fetchUserReportSummary = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user-report/summary", body);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const sampleFileDownloadAsync = createAsyncThunk(
  "user/sampleFileDownloadAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/sample-files/download",
        data
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// User Report For Pie-Chart
export const fetchStaffById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/staff/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// User Report For Pie-Chart
export const fetchUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const patchStaffById = async (updateData, id) => {
  try {
    console.log("id", id);
    // Send the request with id as a URL parameter and data as the body
    const response = await axiosInstance.patch(
      `/api/staff/update/${id}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating mess meals:", error);
    throw error;
  }
};

// Change status of Staff

export const changeStaffStatus = async (data) => {
  try {
    const response = await axiosInstance.post("/api/staff/inactive", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// Export Excell
export const exportUserReport = async (data) => {
  try {
    const response = await axiosInstance.post("/api/user-report/export-all", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// 
export const checkUserName = async (data) => {
  try {
    const response = await axiosInstance.post("/api/staff/username-exists", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// Export Excell
export const passwordSend = async (data) => {
  try {
    const response = await axiosInstance.post("/api/user/send-credentials", {email:data});
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};