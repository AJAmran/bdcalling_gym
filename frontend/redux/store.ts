import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // trainers: trainerReducer,
    // classes: classReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
