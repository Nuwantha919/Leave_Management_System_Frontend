// src/store/auth/authSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './authThunks';
import type { AuthState, UserInfo } from './AuthTypes';

// The initial state is now very simple.
// redux-persist will "rehydrate" this state with saved data from localStorage on app load.
const initialState: AuthState = {
  // We no longer manage form inputs in the global state, it's better as local component state.
  username: '', // This will hold the username *after* a successful login
  
  // Auth status state
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
    // The logout action is now much simpler.
    // We just reset the state to its initial values.
    // redux-persist will automatically see this change and clear the 'auth' data from localStorage.
    logout: (state) => {
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
        // When login fails, reset to the initial (logged-out) state
        Object.assign(state, initialState, { 
          error: action.payload as string || 'Login failed, please try again.'
        });
      });
  },
});

// We no longer need setUsername and setPassword actions
export const { logout } = authSlice.actions;

export default authSlice.reducer;