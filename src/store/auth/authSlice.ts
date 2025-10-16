import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './authThunks'; 
import type { AuthState, UserInfo } from './AuthTypes'; 

// Function to check initial state from storage
const getToken = () => localStorage.getItem('authToken');

const initialState: AuthState = {
  // Form input state (used by Login.tsx)
  username: '', 
  password: '', 
  
  // Auth status state
  token: getToken(),
  role: null,
  
  // Derived state
  isAuthenticated: !!getToken(),
  isLoading: false,
  error: null,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducers to handle form input changes
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.error = null;
    },
    setPassword: (state, action: PayloadAction<string>) => { // <-- FIX: This reducer is now valid
      state.password = action.payload;
      state.error = null;
    },
    logout: (state) => {
      localStorage.removeItem('authToken');
      Object.assign(state, initialState, { 
          token: null, 
          isAuthenticated: false,
          username: '',
          password: ''
      });
    }
  },
  
  extraReducers: (builder) => {
    // Handle the PENDING state of the async thunk
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    });

    // Handle the FULFILLED (SUCCESS) state of the async thunk
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = null;
      
      // Update persistent user info
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.token = action.payload.token;
      
      state.password = ''; // Clear password from state after success
    });

    // Handle the REJECTED (FAILURE) state of the async thunk
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      // Get the error message from the thunk's rejectWithValue
      state.error = action.payload as string || 'Login failed, please try again.'; 
      state.token = null;
    });
  },
});

export const { setUsername, setPassword, logout } = authSlice.actions;

export default authSlice.reducer;