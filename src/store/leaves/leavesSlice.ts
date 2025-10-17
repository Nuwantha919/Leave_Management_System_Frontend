// src/store/leaves/leavesSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { type Leave } from '../../types/leaveTypes';
import { fetchMyLeavesThunk, fetchAllLeavesThunk } from './leavesThunks';

// Define the shape of the state for this slice
interface LeavesState {
  leaves: Leave[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state when the app loads
const initialState: LeavesState = {
  leaves: [],
  status: 'idle',
  error: null,
};

const leavesSlice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {
    // We can add simple, synchronous reducers here if needed later
  },
  // 'extraReducers' listen for actions dispatched by our async thunks
  extraReducers: (builder) => {
    builder
      // --- Reducers for fetching leaves (covers both myLeaves and allLeaves) ---
      .addCase(fetchMyLeavesThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllLeavesThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMyLeavesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leaves = action.payload; // Set the fetched leaves into our state
      })
      .addCase(fetchAllLeavesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leaves = action.payload;
      })
      .addCase(fetchMyLeavesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Store the error message
      })
      .addCase(fetchAllLeavesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
      // We will add more cases here for create, update, and delete thunks later
  },
});

export default leavesSlice.reducer;