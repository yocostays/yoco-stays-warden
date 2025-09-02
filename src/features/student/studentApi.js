import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

export const assignHostel = async (data) => {
  try {
    const response = await axiosInstance.post('/api/user/assign-hostel', data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// --------------Authorization Api starts ------------------------------

export const authorizeUser = async (data) => {
  try {
    const response = await axiosInstance.post('/api/user/update/authorized', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// --------------Authorization Api ends --------------------------------


// --------------Indisciplinary Api ends --------------------------------

export const addIndisciplinary = async (data) => {
  try {
    const response = await axiosInstance.patch('api/user/update-indisciplinary', data);
    return response.data;
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error.message;
  }
};

// --------------Indisciplinary Api ends --------------------------------


// --------------Update Student Status Api starts --------------------------------

export const updateStatus = async(data)=>{
   try {
    const response = await axiosInstance.post('api/user/update-status', data);
    return response.data;
  } catch (error) {
    console.log("Error fetching users:", error);
    toast.error(error.message)
    throw error.message;
  }
}

// --------------Update Student Status Api ends --------------------------------