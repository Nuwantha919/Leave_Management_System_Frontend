import { createAsyncThunk } from '@reduxjs/toolkit';
import * as leaveService from '../../services/leaveService';
import { type CreateLeaveDto } from '../../types/leaveTypes';
import { type RootState } from '../store';

const THUNK_PREFIX = 'leaves';

export const fetchMyLeavesThunk = createAsyncThunk(
  `leaves/fetchMyLeaves`,
  // The thunkAPI object gives us access to getState
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get the current state and extract the username
      const state = getState() as RootState;
      const username = state.auth.username;

      // If there's no username, we can't fetch data
      if (!username) {
        return rejectWithValue('User is not logged in.');
      }

      // Call the service with the username
      const leaves = await leaveService.fetchMyLeaves(username);
      return leaves;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your leaves');
    }
  }
);

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


// --- ACTION THUNKS (New additions) ---

/**
 * Thunk to create a new leave request.
 */
export const createLeaveThunk = createAsyncThunk(
  `${THUNK_PREFIX}/createLeave`,
  async (leaveData: CreateLeaveDto, { rejectWithValue }) => {
    try {
      const newLeave = await leaveService.createLeave(leaveData);
      return newLeave;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create leave request');
    }
  }
);

/**
 * Thunk to update a leave's status (Approve/Reject).
 */
export const updateLeaveStatusThunk = createAsyncThunk(
  `leaves/updateLeaveStatus`,
  async ({ id, status }: { id: number; status: 'APPROVED' | 'REJECTED' }, { rejectWithValue }) => {
    try {
      // Calls the new updateLeaveStatus function in our service
      const updatedLeave = await leaveService.updateLeaveStatus(id, status);
      return updatedLeave;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update leave status');
    }
  }
);
/**
 * Thunk to edit an existing leave request.
 */
export const editLeaveThunk = createAsyncThunk(
  `leaves/editLeave`,
  async (
    { id, updatedData }: { id: number; updatedData: { startDate: string; endDate: string; reason: string } },
    { rejectWithValue }
  ) => {
    try {
      const updatedLeave = await leaveService.updateLeave(id, updatedData);
      return updatedLeave;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to edit leave');
    }
  }
);

/**
 * Thunk to delete (cancel) a leave request.
 */
export const deleteLeaveThunk = createAsyncThunk(
  `${THUNK_PREFIX}/deleteLeave`,
  async (id: number, { rejectWithValue }) => {
    try {
      await leaveService.deleteLeave(id);
      return id; // Return the ID of the deleted leave for the reducer
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete leave');
    }
  }
);