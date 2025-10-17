// src/store/leaves/leavesSlice.ts

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type Leave } from '../../types/leaveTypes';
import { 
  fetchMyLeavesThunk, 
  fetchAllLeavesThunk,
  createLeaveThunk,
  updateLeaveStatusThunk,
  deleteLeaveThunk
} from './leavesThunks';

interface LeavesState {
  leaves: Leave[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LeavesState = {
  leaves: [],
  status: 'idle',
  error: null,
};

const leavesSlice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Cases for when a leave is successfully CREATED ---
      .addCase(createLeaveThunk.fulfilled, (state, action) => {
        state.leaves.push(action.payload); // Add the new leave to the state
        state.status = 'succeeded';
      })
      
      // --- Cases for when a leave is successfully UPDATED ---
      .addCase(updateLeaveStatusThunk.fulfilled, (state, action) => {
        const index = state.leaves.findIndex(leave => leave.id === action.payload.id);
        if (index !== -1) {
          state.leaves[index] = action.payload; // Replace the old leave with the updated one
        }
        state.status = 'succeeded';
      })
      
      // --- Cases for when a leave is successfully DELETED ---
      .addCase(deleteLeaveThunk.fulfilled, (state, action) => {
        // Filter out the leave with the matching ID
        state.leaves = state.leaves.filter(leave => leave.id !== action.payload);
        state.status = 'succeeded';
      })

      // --- Matchers for handling PENDING and FAILED states collectively ---
      .addMatcher(
        isAnyOf(
          fetchMyLeavesThunk.pending, 
          fetchAllLeavesThunk.pending, 
          createLeaveThunk.pending,
          updateLeaveStatusThunk.pending,
          deleteLeaveThunk.pending
        ), 
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchMyLeavesThunk.fulfilled,
          fetchAllLeavesThunk.fulfilled
        ),
        (state, action) => {
          state.status = 'succeeded';
          state.leaves = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchMyLeavesThunk.rejected, 
          fetchAllLeavesThunk.rejected,
          createLeaveThunk.rejected,
          updateLeaveStatusThunk.rejected,
          deleteLeaveThunk.rejected
        ), 
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        }
      );
  },
});

export default leavesSlice.reducer;