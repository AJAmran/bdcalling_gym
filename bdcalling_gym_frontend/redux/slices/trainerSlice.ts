import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Trainer {
  id: string;
  name: string;
  email: string;
  expertise: string;
}

interface TrainersState {
  trainers: Trainer[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainersState = {
  trainers: [],
  loading: false,
  error: null,
};

// Async actions
export const fetchTrainers = createAsyncThunk(
  "trainers/fetchTrainers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/trainers");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch trainers"
      );
    }
  }
);

export const addTrainer = createAsyncThunk(
  "trainers/addTrainer",
  async (newTrainer: Omit<Trainer, "id">, thunkAPI) => {
    try {
      const response = await axios.post("/api/trainers", newTrainer);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add trainer"
      );
    }
  }
);

export const deleteTrainer = createAsyncThunk(
  "trainers/deleteTrainer",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/api/trainers/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
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
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(
        addTrainer.fulfilled,
        (state, action: PayloadAction<Trainer>) => {
          state.trainers.push(action.payload);
        }
      )
      .addCase(addTrainer.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(
        deleteTrainer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.trainers = state.trainers.filter(
            (trainer) => trainer.id !== action.payload
          );
        }
      )
      .addCase(deleteTrainer.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export default trainersSlice.reducer;
