import axiosInstance from "../../utils/axiosInstance";


export const loginApi = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/auth/signin", userData);
    return response.data;
  } catch (error) {
    console.log("Error Login:", error);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log("Error Logout:", error);
    throw error;
  }
};

export const refreshTokenApi = async (hostelId) => {
  try {
    const response = await axiosInstance.post("/api/auth/refresh-token", hostelId);
    return response.data;
  } catch (error) {
    console.log("Error Refresh Token:", error);
    throw error;
  }
};

export const fetchOTP = async (mail) => {
  try {
    const response = await axiosInstance.post("/api/auth/staff/generate-otp", mail);
    return response.data;
  } catch (error) {
    console.log("Error Fetching OTP:", error);
    throw error;
  }
};

export const resetCredentials = async (body) => {
  try {
    const response = await axiosInstance.post("/api/auth/staff/reset-password", body);
    return response.data;
  } catch (error) {
    console.log("Error Password reset Failed:", error);
    throw error;
  }
};

export const generateOtpAsync = async (body) => {
  try {
    const response = await axiosInstance.post("/api/auth/generate-otp", body);
    return response.data;
  } catch (error) {
    console.log("Error Password reset Failed:", error);
    throw error;
  }
};

export const verifyOtpAsync = async (body) => {
  try {
    const response = await axiosInstance.post("/api/auth/verify-otp", body);
    return response.data;
  } catch (error) {
    console.log("Error Password reset Failed:", error);
    throw error;
  }
};

export const generateOtpMail = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/request-account-deletion", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyGmailOtp = async (body) => {
  try {
    const response = await axiosInstance.post("/api/user/request-otp-verify", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userDeactivateRequest = async (body) => {
  try {
    const response = await axiosInstance.patch("/api/user/request-account-deactivate", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

