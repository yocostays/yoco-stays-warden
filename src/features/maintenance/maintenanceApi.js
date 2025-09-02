import axiosInstance from "../../utils/axiosInstance";

export const fetchComplaint = async (page = 1, limit = 10, status = "all") => {
  try {
    const response = await axiosInstance.get("/api/complaint", {
      params: {
        page: page,
        limit: limit,
        status: status,
      },
    });
  
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// fetch staff to assign
export const fetchStaff = async () => {
  try {
    const response = await axiosInstance.post("/api/staff/maintenance-list");
  
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// fetch Top complaint
export const fetchTopComplaint = async () => {
  try {
    const response = await axiosInstance.post("/api/maintenance-report/top-category");
  
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// fetch Top complaint
export const fetchMaintenanceReport = async () => {
  try {
    const response = await axiosInstance.post("/api/maintenance-report/summary");
  
    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// fetch complaint by id
export const fetchComplaintById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/complaint/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching mess:", error);
    throw error;
  }
};

// update status
export const updateComplaintStatus = async (data) => {
  try {
    const response = await axiosInstance.patch(
      `/api/complaint/update-status`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating complaint status:", error);
    throw error;
  }
};

// update staff
export const updateStaff = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/api/complaint/allocate-staff`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating complaint status:", error);
    throw error;
  }
};

// get individual complaint
export const getIndividualComplaintAsync = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/api/complaint/individual-complaint`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating complaint status:", error);
    throw error;
  }
};
