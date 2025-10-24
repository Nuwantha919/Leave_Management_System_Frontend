// src/store/leaves/leavesSlice.ts

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type Leave } from '../../types/leaveTypes';
import { 
  fetchMyLeavesThunk, 
  fetchAllLeavesThunk,
  fetchAllLeavesPaginatedThunk,
  createLeaveThunk,
  updateLeaveStatusThunk,
  deleteLeaveThunk,
  editLeaveThunk
} from './leavesThunks';

interface LeavesState {
  leaves: Leave[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  // Pagination metadata
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}

const initialState: LeavesState = {
  leaves: [],
  status: 'idle',
  error: null,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  pageSize: 10,
};

const leavesSlice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle paginated fetch
      .addCase(fetchAllLeavesPaginatedThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leaves = action.payload.content;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
        state.pageSize = action.payload.pageSize;
      })
      
      // Cases for when a leave is successfully CREATED or DELETED
      .addCase(createLeaveThunk.fulfilled, (state, action) => {
        state.leaves.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteLeaveThunk.fulfilled, (state, action) => {
        state.leaves = state.leaves.filter(leave => leave.id !== action.payload);
        state.status = 'succeeded';
      })

      // Matcher for any successful UPDATE or EDIT action
      .addMatcher(
        isAnyOf(updateLeaveStatusThunk.fulfilled, editLeaveThunk.fulfilled),
        (state, action) => {
          const index = state.leaves.findIndex(leave => leave.id === action.payload.id);
          if (index !== -1) {
            state.leaves[index] = action.payload; // Replace the old leave with the updated one
          }
          state.status = 'succeeded';
        }
      )
      
      // Matcher for handling FETCH states
      .addMatcher(
        isAnyOf(fetchMyLeavesThunk.fulfilled, fetchAllLeavesThunk.fulfilled),
        (state, action) => {
          state.status = 'succeeded';
          state.leaves = action.payload;
        }
      )

      // Matcher for any PENDING action
      .addMatcher(
        isAnyOf(
          fetchMyLeavesThunk.pending, 
          fetchAllLeavesThunk.pending, 
          fetchAllLeavesPaginatedThunk.pending,
          createLeaveThunk.pending,
          updateLeaveStatusThunk.pending,
          deleteLeaveThunk.pending,
          editLeaveThunk.pending
        ), 
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      
      // Matcher for any REJECTED action
      .addMatcher(
        isAnyOf(
          fetchMyLeavesThunk.rejected, 
          fetchAllLeavesThunk.rejected,
          fetchAllLeavesPaginatedThunk.rejected,
          createLeaveThunk.rejected,
          updateLeaveStatusThunk.rejected,
          deleteLeaveThunk.rejected,
          editLeaveThunk.rejected
        ), 
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        }
      );
  },
});

export default leavesSlice.reducer;