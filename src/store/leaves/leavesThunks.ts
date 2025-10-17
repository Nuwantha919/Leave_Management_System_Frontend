// src/store/leaves/leavesThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as leaveService from '../../services/leaveService';
import { type CreateLeaveDto } from '../../types/leaveTypes';

const THUNK_PREFIX = 'leaves';

// --- FETCH THUNKS (Already created, no changes) ---
export const fetchMyLeavesThunk = createAsyncThunk(
  `${THUNK_PREFIX}/fetchMyLeaves`,
  async (_, { rejectWithValue }) => {
    try {
      const leaves = await leaveService.fetchMyLeaves();
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
  `${THUNK_PREFIX}/updateLeaveStatus`,
  async ({ id, status }: { id: number; status: 'APPROVED' | 'REJECTED' }, { rejectWithValue }) => {
    try {
      const updatedLeave = await leaveService.updateLeave(id, { status });
      return updatedLeave;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update leave status');
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