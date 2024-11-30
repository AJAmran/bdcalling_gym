import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import trainerReducer from "./slices/trainerSlice";
import classScheduleReducer from "./slices/schedulesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trainers: trainerReducer,
    schedules: classScheduleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
