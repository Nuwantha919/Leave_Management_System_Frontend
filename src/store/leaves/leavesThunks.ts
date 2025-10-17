// src/store/leaves/leavesThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as leaveService from '../../services/leaveService'; // Import all functions from the service

// A unique string identifier for the thunk
const THUNK_PREFIX = 'leaves';

/**
 * Thunk to fetch leaves for the logged-in user (Employee view)
 */
export const fetchMyLeavesThunk = createAsyncThunk(
  `${THUNK_PREFIX}/fetchMyLeaves`,
  async (_, { rejectWithValue }) => {
    try {
      const leaves = await leaveService.fetchMyLeaves();
      return leaves;
    } catch (error: any) {
      // Use rejectWithValue to send a standardized error payload
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your leaves');
    }
  }
);

/**
 * Thunk to fetch all leaves for all users (Admin view)
 */
export const fetchAllLeavesThunk = createAsyncThunk(
  `${THUNK_PREFIX}/fetchAllLeaves`,
  async (_, { rejectWithValue }) => {
    try {
      const leaves = await leaveService.fetchAllLeaves();
      return leaves;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all leaves');
    }
  }
);

// We will add thunks for createLeave, updateLeave, and deleteLeave here later.