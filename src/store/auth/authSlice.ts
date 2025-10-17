// src/store/auth/authSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './authThunks';
import type { AuthState, UserInfo } from './AuthTypes';

const initialState: AuthState = {
  username: null,
  token: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Reset the state to its initial values. redux-persist clears storage automatically.
      Object.assign(state, initialState);
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        Object.assign(state, initialState, { 
          error: action.payload as string || 'Login failed, please try again.'
        });
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;