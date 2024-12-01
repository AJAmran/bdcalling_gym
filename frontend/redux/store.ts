import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // trainers: trainerReducer,
    // classes: classReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
