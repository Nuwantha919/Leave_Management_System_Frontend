// Mock the api module to avoid import.meta issues
jest.mock('../../../services/api');
jest.mock('../../../services/leaveService');

import leavesReducer from '../leavesSlice';
import { 
  createLeaveThunk, 
  updateLeaveStatusThunk, 
  editLeaveThunk, 
  deleteLeaveThunk 
} from '../leavesThunks';
import { type Leave } from '../../../types/leaveTypes';

interface LeavesState {
  leaves: Leave[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}

// Define a realistic mock state based on your LeavesState interface
const mockInitialState: LeavesState = {
  leaves: [
    { id: 10, status: 'PENDING', reason: 'Vacation', startDate: '2025-12-01', endDate: '2025-12-05', employeeId: 1, employeeName: 'testuser' },
    { id: 11, status: 'APPROVED', reason: 'Flu', startDate: '2025-10-10', endDate: '2025-10-12', employeeId: 2, employeeName: 'admin' },
  ],
  status: 'succeeded',
  error: null,
  currentPage: 0,
  totalPages: 1,
  totalElements: 2,
  pageSize: 10,
};


describe('Leaves Slice Reducer', () => {

  // --- TEST LEAVE CREATION ---
  it('should add a new leave to the list on createLeaveThunk.fulfilled', () => {
    // Arrange
    const newLeave: Leave = { id: 12, status: 'PENDING', reason: 'New baby', startDate: '2026-01-01', endDate: '2026-01-05', employeeId: 1, employeeName: 'testuser' };
    const action = {
      type: createLeaveThunk.fulfilled.type,
      payload: newLeave,
    };

    // Act
    const newState = leavesReducer(mockInitialState, action);

    // Assert
    expect(newState.leaves).toHaveLength(3);
    expect(newState.leaves.some(l => l.id === 12)).toBe(true);
    expect(newState.status).toBe('succeeded');
  });

  // --- TEST LEAVE UPDATE (Status Change) ---
  it('should update the status of an existing leave on updateLeaveStatusThunk.fulfilled', () => {
    // Arrange
    const approvedLeave: Leave = { ...mockInitialState.leaves[0], status: 'APPROVED' };
    const action = {
      type: updateLeaveStatusThunk.fulfilled.type,
      payload: approvedLeave,
    };

    // Act
    const newState = leavesReducer(mockInitialState, action);

    // Assert
    // Find the leave and check its new status
    const updatedLeave = newState.leaves.find(l => l.id === 10);
    expect(updatedLeave?.status).toBe('APPROVED');
    expect(newState.leaves).toHaveLength(2); // Ensure length is unchanged
  });

  // --- TEST LEAVE EDIT (Generic Data Change) ---
  it('should update reason and dates on editLeaveThunk.fulfilled', () => {
    // Arrange
    const editedLeave: Leave = { ...mockInitialState.leaves[0], reason: 'Updated reason', startDate: '2025-12-15' };
    const action = {
      type: editLeaveThunk.fulfilled.type,
      payload: editedLeave,
    };

    // Act
    const newState = leavesReducer(mockInitialState, action);

    // Assert
    const updatedLeave = newState.leaves.find(l => l.id === 10);
    expect(updatedLeave?.reason).toBe('Updated reason');
    expect(updatedLeave?.startDate).toBe('2025-12-15');
    expect(newState.leaves).toHaveLength(2);
  });
  
  // --- TEST LEAVE DELETION/CANCELLATION ---
  it('should remove the leave from the list on deleteLeaveThunk.fulfilled', () => {
    // Arrange
    const deletedId = 11;
    const action = {
      type: deleteLeaveThunk.fulfilled.type,
      payload: deletedId,
    };

    // Act
    const newState = leavesReducer(mockInitialState, action);

    // Assert
    expect(newState.leaves).toHaveLength(1);
    expect(newState.leaves.some(l => l.id === deletedId)).toBe(false);
  });
});