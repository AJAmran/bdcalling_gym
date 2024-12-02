import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://gym-backend-lake.vercel.app/api/trainers";

// Interfaces
interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
}

interface TrainersState {
  trainers: Trainer[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: TrainersState = {
  trainers: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTrainers = createAsyncThunk(
  "trainers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch trainers"
      );
    }
  }
);

export const addTrainer = createAsyncThunk(
  "trainers/add",
  async (trainerData: Omit<Trainer, "id">, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, trainerData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add trainer"
      );
    }
  }
);

export const updateTrainer = createAsyncThunk(
  "trainers/update",
  async (
    { id, data }: { id: string; data: Partial<Trainer> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update trainer"
      );
    }
  }
);

export const deleteTrainer = createAsyncThunk(
  "trainers/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete trainer"
      );
    }
  }
);

// Slice
const trainersSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTrainers.fulfilled,
        (state, action: PayloadAction<Trainer[]>) => {
          state.trainers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTrainers.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(
        addTrainer.fulfilled,
        (state, action: PayloadAction<Trainer>) => {
          state.trainers.push(action.payload);
        }
      )
      .addCase(
        updateTrainer.fulfilled,
        (state, action: PayloadAction<Trainer>) => {
          const index = state.trainers.findIndex(
            (t) => t.id === action.payload.id
          );
          if (index !== -1) {
            state.trainers[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteTrainer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.trainers = state.trainers.filter(
            (t) => t.id !== action.payload
          );
        }
      );
  },
});

export default trainersSlice.reducer;
