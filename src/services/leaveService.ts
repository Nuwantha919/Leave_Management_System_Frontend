// src/services/leaveService.ts

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
 * Fetches leaves for the currently logged-in employee.
 * The backend knows who the user is from the token.
 */
export const fetchMyLeaves = async (): Promise<Leave[]> => {
    // The endpoint is the same, but the backend's security logic
    // will return only the leaves for the user associated with the token.
    const response = await api.get('/leaves');
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

/**
 * Deletes (cancels) a pending leave request.
 * @param id - The ID of the leave to delete.
 */
export const deleteLeave = async (id: number): Promise<void> => {
  await api.delete(`/leaves/${id}`);
};