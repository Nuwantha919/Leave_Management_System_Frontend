import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Define RootState and AppDispatch types based on the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;