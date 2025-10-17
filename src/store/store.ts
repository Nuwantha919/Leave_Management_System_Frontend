import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import leavesReducer from './leaves/leavesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leaves: leavesReducer,
  },
});

// Define RootState and AppDispatch types based on the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;