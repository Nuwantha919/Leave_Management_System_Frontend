import { createAsyncThunk } from '@reduxjs/toolkit';
import { type LoginCredentials } from './AuthTypes'; // <-- FIX: Use 'type' keyword

// Placeholder for API client (e.g., axios)
// import api from '../../services/api'; 

// Define the async thunk for the login process
export const loginUser = createAsyncThunk(
  // Action type prefix: 'auth/loginUser'
  'auth/loginUser',
  
  // The payload creator function
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // --- START: Replace this simulated API call with your actual backend call ---
      console.log("Attempting to log in with:", credentials);
      
      // Simulate an API delay
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
      if (credentials.username === 'test' && credentials.password === 'password') {
        // Simulated successful response
        return {
          token: 'fake-jwt-token-12345',
          user: { id: 1, name: 'Test User', role: 'Employee' }
        };
      } else {
        // Simulated authentication failure
        throw new Error('Invalid username or password.');
      }
      // --- END: Simulated API call ---

    } catch (error) {
      // Use rejectWithValue to pass the error message to the rejected action
      const errorMessage = (error instanceof Error) ? error.message : 'Login failed due to network error.';
      return rejectWithValue(errorMessage);
    }
  }
);