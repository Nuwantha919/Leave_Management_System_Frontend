jest.mock('../../store/store');
import mockStore, { MockStore } from '../../../testUtils/mockStore';
import { 
  createLeaveThunk, 
  updateLeaveStatusThunk, 
  editLeaveThunk,
  deleteLeaveThunk
} from '../leavesThunks';
import * as leaveService from '../../../services/leaveService'; // Jest uses the mock

// Access the functions from the manual mock file
const { createLeave, updateLeave, updateLeaveStatus, deleteLeave } = leaveService as any;

// Define a minimal state structure needed for context (e.g., auth for ThunkAPI)
const mockInitialState: any = { 
  auth: { username: 'testuser', token: 'xyz' }, 
  leaves: { leaves: [] } 
};
let store: MockStore;

describe('Leaves Thunks (Creation, Update, Delete)', () => {

  beforeEach(() => {
    store = mockStore(mockInitialState);
    jest.clearAllMocks();
  });

  const mockCreateData = { startDate: '2025-12-01', endDate: '2025-12-05', reason: 'Vacation' };
  const mockLeaveResponse = { id: 10, ...mockCreateData, status: 'PENDING', employeeId: 1, employeeName: 'testuser' };
  const mockError = { response: { data: { message: 'Dates overlap with an existing leave.' } } };


  // --- TEST LEAVE CREATION LOGIC ---
  describe('createLeaveThunk', () => {
    
    it('should dispatch fulfilled action on successful leave creation', async () => {
      // Arrange
      createLeave.mockResolvedValue(mockLeaveResponse); 
      
      // Act
      await store.dispatch(createLeaveThunk(mockCreateData)); 

      // Assert
      expect(createLeave).toHaveBeenCalledWith(mockCreateData);
      const actions = store.getActions();
      expect(actions[1].type).toBe(createLeaveThunk.fulfilled.type);
      expect(actions[1].payload).toEqual(mockLeaveResponse);
    });

    it('should dispatch rejected action on API validation failure', async () => {
      // Arrange
      createLeave.mockRejectedValue(mockError); 
      
      // Act
      await store.dispatch(createLeaveThunk(mockCreateData)); 

      // Assert
      const actions = store.getActions();
      expect(actions[1].type).toBe(createLeaveThunk.rejected.type);
      // Check the payload returned by rejectWithValue
      expect(actions[1].payload).toContain('Dates overlap'); 
    });
  });


  // --- TEST LEAVE UPDATE/EDIT FLOW ---
  describe('editLeaveThunk', () => {

    it('should dispatch fulfilled action on successful leave edit', async () => {
      // Arrange
      const updatedData = { startDate: '2025-12-02', endDate: '2025-12-06', reason: 'New plan' };
      const mockUpdatedResponse = { ...mockLeaveResponse, ...updatedData };
      updateLeave.mockResolvedValue(mockUpdatedResponse); 
      
      // Act
      await store.dispatch(editLeaveThunk({ id: 10, updatedData })); 

      // Assert
      expect(updateLeave).toHaveBeenCalledWith(10, updatedData);
      const actions = store.getActions();
      expect(actions[1].type).toBe(editLeaveThunk.fulfilled.type);
      expect(actions[1].payload.reason).toBe('New plan');
    });

    it('should dispatch rejected action if edit is restricted (e.g., trying to edit an APPROVED leave)', async () => {
      // Arrange
      const restrictionError = { response: { data: { message: 'Cannot edit approved leave.' } } };
      updateLeave.mockRejectedValue(restrictionError); 
      
      // Act
      await store.dispatch(editLeaveThunk({ id: 10, updatedData: mockCreateData })); 

      // Assert
      const actions = store.getActions();
      expect(actions[1].type).toBe(editLeaveThunk.rejected.type);
      expect(actions[1].payload).toContain('Cannot edit approved leave.');
    });
  });


  // --- TEST STATUS CHANGE FLOW ---
  describe('updateLeaveStatusThunk', () => {

    it('should dispatch fulfilled action on successful status update to APPROVED', async () => {
      // Arrange
      const statusPayload = { id: 10, status: 'APPROVED' as const };
      const mockUpdatedResponse = { ...mockLeaveResponse, status: 'APPROVED' };
      updateLeaveStatus.mockResolvedValue(mockUpdatedResponse); 
      
      // Act
      await store.dispatch(updateLeaveStatusThunk(statusPayload)); 

      // Assert
      expect(updateLeaveStatus).toHaveBeenCalledWith(10, 'APPROVED');
      const actions = store.getActions();
      expect(actions[1].type).toBe(updateLeaveStatusThunk.fulfilled.type);
      expect(actions[1].payload.status).toBe('APPROVED');
    });

    it('should dispatch rejected action if status update is restricted', async () => {
      // Arrange
      const restrictionError = { response: { data: { message: 'Only managers can approve leaves.' } } };
      updateLeaveStatus.mockRejectedValue(restrictionError); 
      
      // Act
      await store.dispatch(updateLeaveStatusThunk({ id: 10, status: 'REJECTED' as const })); 

      // Assert
      const actions = store.getActions();
      expect(actions[1].type).toBe(updateLeaveStatusThunk.rejected.type);
      expect(actions[1].payload).toContain('Only managers can approve leaves.');
    });
  });


  // --- TEST LEAVE DELETION ---
  describe('deleteLeaveThunk', () => {

    it('should dispatch fulfilled action with ID on successful deletion', async () => {
      // Arrange
      const leaveId = 10;
      deleteLeave.mockResolvedValue(undefined); // Deletion returns void
      
      // Act
      await store.dispatch(deleteLeaveThunk(leaveId)); 

      // Assert
      expect(deleteLeave).toHaveBeenCalledWith(leaveId);
      const actions = store.getActions();
      expect(actions[1].type).toBe(deleteLeaveThunk.fulfilled.type);
      expect(actions[1].payload).toBe(leaveId); // Asserting the ID is returned for reducer
    });
  });
});