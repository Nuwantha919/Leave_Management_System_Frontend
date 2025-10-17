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
  maximumLeaveCount: null,
  leavesTaken: null,
  leaveBalance: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
        state.maximumLeaveCount = action.payload.maximumLeaveCount;
        state.leavesTaken = action.payload.leavesTaken;
        state.leaveBalance = action.payload.leaveBalance;
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