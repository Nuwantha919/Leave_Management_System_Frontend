import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../../services/userService';
import { type UserRegistrationData } from './usersTypes';

export const createUserThunk = createAsyncThunk(
  'users/createUser',
  async (userData: UserRegistrationData, { rejectWithValue }) => {
    try {
      const newUser = await registerUser(userData);
      return newUser;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);