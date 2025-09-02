import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addIndisciplinary, assignHostel, authorizeUser, updateStatus } from './studentApi';

// Define the initial state
const initialState = {
  users: [],
  submitting: false,
  error: null,
  loading: false
};

// Thunk for fetching users
export const assignStudentHostel = createAsyncThunk('student/assignStudentHostel', async (newData) => {
  const data = await assignHostel(newData);
  return data;
});

// Thunk for fetching users
export const authorizeRole = createAsyncThunk('student/authorizeRole', async (newData) => {
  const data = await authorizeUser(newData);
  return data;
});

// Thunk for fetching users
export const createIndisciplinary = createAsyncThunk('student/createIndisciplinary', async (newData) => {
  const data = await addIndisciplinary(newData);
  return data;
});

// Thunk for update student status
export const updateStudentStatus = createAsyncThunk('student/updateStudentStatus', async (newData) => {
  const data = await updateStatus(newData);
  return data;
});

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getUsers cases
      .addCase(assignStudentHostel.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(assignStudentHostel.fulfilled, (state, action) => {
        state.submitting = false;
        state.users = action.payload;
      })
      .addCase(assignStudentHostel.rejected, (state) => {
        state.submitting = false;
        state.users = [];
      });
    
    builder
      // Handle Authorization cases
      .addCase(authorizeRole.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(authorizeRole.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(authorizeRole.rejected, (state) => {
        state.submitting = false;
      });
    
      // Handle Indisciplinary cases
    builder
      .addCase(createIndisciplinary.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createIndisciplinary.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createIndisciplinary.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || action.error?.message || "Login failed";
      });

      // Handler for update student status
        builder
      .addCase(updateStudentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudentStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStudentStatus.rejected, (state, action) => {
        state.loading = false;
       
      });
  },
});

export const selectSubmitting = (state) => state.student.submitting;
// Export the reducer
export default studentSlice.reducer;
