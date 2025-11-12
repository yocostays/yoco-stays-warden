
import axiosInstance from "../../utils/axiosInstance";

export const getComplaintCategoryApi = async (data) => {
    try {
      const response = await axiosInstance.post('/api/complaint-category', data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
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

  export const getFrequentComplaintCategoriesApi = async (data) => {
    try {
      const response = await axiosInstance.post('/api/maintenance-report/top-category', data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
 
  export const getTotalComplaintOverviewApi = async (data) => {
    try {
      const response = await axiosInstance.post('/api/maintenance-report/overview', data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  export const getAvgResolutionTimeApi = async (data) => {
    try {
      const response = await axiosInstance.post('/api/maintenance-report/resolution-metrics', data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  export const getStaffListApi = async (data) => {
    try {
      const response = await axiosInstance.post('/api/staff/maintenance-list', data);
      console.log(response,"response")
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  export const AssignStaffApi = async (data) => {
    try {
      const response = await axiosInstance.post('/api/complaint/allocate-staff', data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };



  export const fetchComplaint = async (
    page = 1,
    limit = 10,
    status = "all",
    categoryId,
    sort,
    startDate,
    endDate,
    search,
    floorNumber,
    roomNumber,
  ) => {
    try {
      const response = await axiosInstance.get("/api/complaint", {
        params: {
          page,
          limit,
          status,
          categoryId,
          sort,
          startDate,
          endDate,
          search,
          floorNumber,
          roomNumber,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching complaints:", error);
      throw error;
    }
  };

  export const bulkUpdateComplaintApi = async (data) => {
    try {
      const response = await axiosInstance.patch(
        `/api/complaint/bulk-update`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching mess:", error);
      throw error;
    }
  };

  export const exportComplaintReportApi = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/api/maintenance-report/export",
        data
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Network Error" };
    }
  };
  