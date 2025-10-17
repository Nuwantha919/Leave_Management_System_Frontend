import api from './api';
import { type Leave, type CreateLeaveDto } from '../types/leaveTypes';

/**
 * Fetches all leaves. This is for the Admin view.
 */
export const fetchAllLeaves = async (): Promise<Leave[]> => {
  const response = await api.get('/leaves');
  return response.data;
};

/**
 * Fetches leaves for a specific employee by their username.
 * @param username - The username of the employee to fetch leaves for.
 */
export const fetchMyLeaves = async (username: string): Promise<Leave[]> => {
    const response = await api.get(`/leaves?employeeName=${username}`);
    return response.data;
};

/**
 * Creates a new leave request.
 * @param leaveData - The data for the new leave (startDate, endDate, reason).
 */
export const createLeave = async (leaveData: CreateLeaveDto): Promise<Leave> => {
  const response = await api.post('/leaves', leaveData);
  return response.data;
};

/**
 * Updates an existing leave request (e.g., admin approves/rejects).
 * @param id - The ID of the leave to update.
 * @param updatedData - The new data for the leave.
 */
export const updateLeave = async (id: number, updatedData: Partial<Leave>): Promise<Leave> => {
  const response = await api.put(`/leaves/${id}`, updatedData);
  return response.data;
};
export const updateLeaveStatus = async (id: number, status: 'APPROVED' | 'REJECTED'): Promise<Leave> => {
  // Calls the new PUT /api/leaves/{id}/status endpoint
  const response = await api.put(`/leaves/${id}/status`, { status });
  return response.data;
};

/**
 * Deletes (cancels) a pending leave request.
 * @param id - The ID of the leave to delete.
 */
export const deleteLeave = async (id: number): Promise<void> => {
  await api.delete(`/leaves/${id}`);
};