import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: null | { id: string; fullName: string; email: string };
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

// Utility function to store token in cookies/local storage
const saveToken = (token: string) => {
  localStorage.setItem("accessToken", token); // Replace with cookies if needed
};

// Utility function to clear token
const clearToken = () => {
  localStorage.removeItem("accessToken"); // Replace with cookies if needed
};

// Register Trainee
export const registerTrainee = createAsyncThunk(
  "auth/register",
  async (
    {
      fullName,
      email,
      password,
    }: { fullName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/auth/register", {
        fullName,
        email,
        password,
      });
      return response.data; // Assumes { user, accessToken } is returned
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      return response.data; // Assumes { user, accessToken } is returned
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/auth/logout"); // Optional: if backend has logout endpoint
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Restore token from storage when the app loads
    restoreToken(state) {
      const token = localStorage.getItem("accessToken"); // Replace with cookies if needed
      if (token) {
        state.accessToken = token;
      }
    },
    // Clear auth state manually (optional)
    clearAuthState(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Trainee
      .addCase(registerTrainee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTrainee.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        saveToken(action.payload.accessToken);
      })
      .addCase(registerTrainee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        saveToken(action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        clearToken();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { restoreToken, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
