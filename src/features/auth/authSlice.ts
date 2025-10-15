import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AuthState } from './AuthTypes';
import { loginUser } from './authThunks'; // Import the thunk for type safety

const initialState: AuthState = {
  username: '',
  password: '',
  token: null,
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous actions for form input
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    // Action to clear state (e.g., after successful login or on logout)
    resetAuthState: (state) => {
      state.password = ''; // Clear password on submit
      state.isLoading = false;
      state.error = null;
    },
  },
  // Extra reducers to handle the lifecycle of the async thunk
  extraReducers: (builder) => {
    builder
      // 1. Pending: Login started
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // 2. Fulfilled: Login succeeded
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.username = ''; // Clear form data
        state.password = ''; // Clear form data
      })
      // 3. Rejected: Login failed
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Payload is the error message
        state.isAuthenticated = false;
        state.password = ''; // Clear password on failure
      });
  },
});

export const { setUsername, setPassword, resetAuthState } = authSlice.actions;

export default authSlice.reducer;