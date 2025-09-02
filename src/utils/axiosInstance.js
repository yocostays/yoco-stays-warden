import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle 401 errors
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('hostelId');
        localStorage.removeItem('studentId');
        window.location.href = '/';
      }
    }
    // return Promise.reject(error);
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default axiosInstance;
