import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  user: { id: string; role: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

// Initialize from localStorage safely in the browser
if (typeof window !== "undefined") {
  const storedToken = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("user");

  if (storedToken) initialState.token = storedToken;

  if (storedUser && storedUser !== "undefined") {
    try {
      initialState.user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing stored user JSON:", error);
      localStorage.removeItem("user"); // Clean up invalid data
    }
  }
}

const API_URL = "https://gym-backend-lake.vercel.app/api/auth";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: { fullName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(`${API_URL}/register`, userData);
      return "Registration successful";
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    setToken: (state, action: PayloadAction<string>) => {
      try {
        const token = action.payload;
        const decodedUser = jwtDecode<{ id: string; role: string }>(token);
        state.token = token;
        state.user = decodedUser;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(decodedUser));
      } catch (error) {
        console.error("Invalid token:", error);
        state.token = null;
        state.user = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    },
    checkUserRole: (state) => {
      const token = state.token || localStorage.getItem("authToken");
      if (token) {
        const decoded = jwtDecode<{ id: string; role: string }>(token);
        state.user = decoded;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        const token = action.payload;
        const decodedUser = jwtDecode<{ id: string; role: string }>(token);
        state.token = token;
        state.user = decodedUser;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout, setToken, checkUserRole } = authSlice.actions;
export default authSlice.reducer;
