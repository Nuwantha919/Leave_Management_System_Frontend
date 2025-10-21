import { createSlice } from '@reduxjs/toolkit';
import { createUserThunk } from './usersThunks';
import { type UsersState } from './usersTypes';

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Extract user data without the message field
        const { username, role, maximumLeaveCount } = action.payload;
        state.users.push({ 
          username, 
          role: role as 'ADMIN' | 'EMPLOYEE', 
          maximumLeaveCount 
        });
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;