import axiosInstance from "../../utils/axiosInstance";

export const fetchLeaveManagement = async (
  page = 1,
  limit = 10,
  status = "leave",
  leaveStatus = "",
  search = "",
  sort = "",
  startDate = "", 
  endDate = "",
  floorNumber = "",
  roomNumber = "",
) => {
  try {
    const params = {
      page,
      limit,
      status,
      leaveStatus,
    };
    if (search) {
      params.search = search;
    }
    if (sort !== "custom") {
      params.sort = sort;
    }
    if (sort === "custom") {
      params.sort = sort;
      params.startDate = startDate;
      params.endDate = endDate;
    }
    if (roomNumber || floorNumber) {
      params.floorNumber = floorNumber;
      params.roomNumber = roomNumber;
    }
    const response = await axiosInstance.get("/api/leave-management", {
      params: params,
    });

    return response?.data;
  } catch (error) {
    console.error("Error fetching leave management data:", error);
    throw error;
  }
};

// fetch complaint by id
export const fetchLeaveDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/leave-management/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const fetchChangeLeaveStatusById = async (data, id) => {
  try {
    const response = await axiosInstance.patch(
      `/api/leave-management/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

// fetch Leave report Summary id
export const fetchLeaveReportSummary = async (body) => {
  try {
    const response = await axiosInstance.post(`/api/leave-report/summary`, body);
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};
// fetch complaint by id
export const fetchLeaveSummary = async (body) => {
  try {
    const response = await axiosInstance.post(`/api/leave-report/count`, body);
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const fetchPassInfo = async (body) => {
  try {
    const response = await axiosInstance.post(
      `/api/leave-management/get-gatepass-info`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const bulkUpdateStatusAsync = async (data) => {
  try {
    const response = await axiosInstance.patch(
      `/api/leave-management/bulk-update`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const fetchCurrentlyOut = async (body) => {
  try {
    const response = await axiosInstance.post(
      `/api/leave-management/currently-out`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

export const fetchHistoryData = async (
  page = 1,
  limit = 10,
  status = "leave",
  userId = "",
  leaveStatus,
  // search = "",
  durationType,
  startDate,
  endDate
) => {
  try {
    const params = {
      page,
      limit,
      status,
      userId,
      leaveStatus,
      // search,
      durationType,
      startDate,
      endDate,
    };

    // if(durationType) {
    //   params.durationType = durationType
    // }
    // if(startDate || endDate) {
    //   params.startDate = startDate,
    //   params.endDate = endDate
    // }

    const response = await axiosInstance.get(
      "/api/leave-management/individual",
      {
        params: params,
      }
    );

    return response?.data;
  } catch (error) {
    console.error("Error fetching leave management data:", error);
    throw error;
  }
};


export const exportLeaveReportApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/leave-report/export",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};