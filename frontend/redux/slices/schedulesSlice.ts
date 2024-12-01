import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Schedule {
  id: string;
  date: string;
  time: string;
  trainerId: string;
  trainees: string[];
}

interface SchedulesState {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
}

const initialState: SchedulesState = {
  schedules: [],
  loading: false,
  error: null,
};

// Async actions
export const fetchSchedules = createAsyncThunk(
  "schedules/fetchSchedules",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/schedules");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch schedules"
      );
    }
  }
);

export const addSchedule = createAsyncThunk(
  "schedules/addSchedule",
  async (newSchedule: Omit<Schedule, "id">, thunkAPI) => {
    try {
      const response = await axios.post("/api/schedules", newSchedule);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
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
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(
        addSchedule.fulfilled,
        (state, action: PayloadAction<Schedule>) => {
          state.schedules.push(action.payload);
        }
      )
      .addCase(addSchedule.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export default schedulesSlice.reducer;
