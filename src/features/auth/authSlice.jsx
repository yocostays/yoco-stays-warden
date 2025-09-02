import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi, refreshTokenApi, fetchOTP, resetCredentials, generateOtpAsync, verifyOtpAsync } from "./authApi"; // Ensure refreshTokenApi is imported

// Thunk for handling login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginApi(credentials);
      return response; // This response will be sent to the slice as `action.payload`
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

// Thunk for handling logout
export const appLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logoutApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Logout failed");
    }
  }
);

// Thunk for refreshing the token
export const refreshAuthToken = createAsyncThunk(
  "auth/refreshToken",
  async (hostelId, thunkAPI) => {
    try {
      const response = await refreshTokenApi(hostelId); // Call the refreshTokenApi with hostelId
      return response.auth; // Assuming the response contains the new token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Token refresh failed");
    }
  }
);

// Thunk for handling OTP
export const getOtp = createAsyncThunk(
  "auth/getOtp",
  async (mail, thunkAPI) => {
    try {
      const response = await fetchOTP(mail);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

// Thunk for handling login
export const newPassword = createAsyncThunk(
  "auth/newPassword",
  async (mail, thunkAPI) => {
    try {
      const response = await resetCredentials(mail);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

// Generate OTP
export const generateOtp = createAsyncThunk(
  "auth/generateOtp",
  async (data, thunkAPI) => {
    try {
      const response = await generateOtpAsync(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Otp not generated");
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, thunkAPI) => {
    try {
      const response = await verifyOtpAsync(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Otp not generated");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authToken: null, // Store the auth token
    loading: false,
    submitting: false,
    error: null,
    isSubmitting: false,
    isVerifying: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Regular logout reducer to reset the state
    logout: (state) => {
      state.user = null;
      state.authToken = null; // Clear the auth token
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    // Handle login cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.authToken = action.payload.auth; // Set the token
        localStorage.setItem("authToken", action.payload.auth);
        localStorage.setItem("userData", JSON.stringify(action.payload.data));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Login failed";
      });

    // Handle logout cases using async thunk
    builder
      .addCase(appLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // Reset user state
        state.authToken = null; // Reset auth token
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      })
      .addCase(appLogout.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Logout failed";
      });

    // Handle refresh token cases
    builder
      .addCase(refreshAuthToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.loading = false;
        // Log the payload to check what is returned
        window.location.reload();

        // Remove the old token
        localStorage.removeItem("authToken");

        // Ensure the token exists in action.payload before setting it
        if (action.payload && action.payload) {
          state.authToken = action.payload; // Update state with the new token
          localStorage.setItem("authToken", action.payload); // Update localStorage with the new token
        } else {
          console.error("New auth token not found in the response.");
        }
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Token refresh failed";
      });

    // Handle get Otp 
    builder
      .addCase(getOtp.pending, (state) => {
        state.submitting = true;
      })
      .addCase(getOtp.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(getOtp.rejected, (state) => {
        state.submitting = false;
      });

    // Handle set New password 
    builder
      .addCase(newPassword.pending, (state) => {
        state.submitting = true;
      })
      .addCase(newPassword.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(newPassword.rejected, (state) => {
        state.submitting = false;
      });

    // Generate Otp
    builder
      .addCase(generateOtp.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(generateOtp.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(generateOtp.rejected, (state) => {
        state.isSubmitting = false;
      });

    // Verify Otp
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.isVerifying = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isVerifying = false;
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.isVerifying = false;
      });
  },
});

// Export actions and reducer
export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
