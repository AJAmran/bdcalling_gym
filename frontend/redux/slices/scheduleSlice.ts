import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://gym-backend-lake.vercel.app/api/schedules";

// Interfaces
interface Schedule {
  id: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:mm
  duration: number; // Duration in hours
  trainerId: string;
}

interface SchedulesState {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: SchedulesState = {
  schedules: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchSchedules = createAsyncThunk(
  "schedules/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch schedules"
      );
    }
  }
);

export const addSchedule = createAsyncThunk(
  "schedules/add",
  async (scheduleData: Omit<Schedule, "id">, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, scheduleData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add schedule"
      );
    }
  }
);

// Slice
const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSchedules.fulfilled,
        (state, action: PayloadAction<Schedule[]>) => {
          state.schedules = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSchedules.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(
        addSchedule.fulfilled,
        (state, action: PayloadAction<Schedule>) => {
          state.schedules.push(action.payload);
        }
      );
  },
});

export default schedulesSlice.reducer;
