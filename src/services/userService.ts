import api from './api';
import { type UserRegistrationData } from '../store/users/usersTypes';
import { type UserRegistrationResponse } from '../types/userTypes'; 

/**
 * Registers a new user. (Admin only feature)
 * @param userData - The new user's username, password, and role.
 * @returns UserRegistrationResponse with username, role, maximumLeaveCount, and message
 */
export const registerUser = async (userData: UserRegistrationData): Promise<UserRegistrationResponse> => {
  const response = await api.post('/users', userData);
  return response.data;
};