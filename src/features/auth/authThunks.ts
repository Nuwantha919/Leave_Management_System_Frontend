// src/features/auth/authThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../services/authService'; 
import type { // <-- FIX: Using 'import type' for all type definitions
  RootState 
} from '../../app/store'; // Ensure RootState is defined in store.ts
import type { 
  LoginRequestData, 
  UserInfo 
} from './AuthTypes'; 
import axios from 'axios';


/**
 * Async Thunk to handle the user login process.
 */
export const loginUser = createAsyncThunk<
  UserInfo,                            // Success payload type
  LoginRequestData,                    // Argument type
  { rejectValue: string, state: RootState } // ThunkAPI config
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const responseData = await login(credentials);
      const user: UserInfo = {
        username: responseData.username,
        role: responseData.role,
        token: responseData.token,
      };

      return user; 

    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown login error occurred.';
      return rejectWithValue(message); 
    }
  }
);