// src/services/userService.ts

import api from './api';
import { type UserRegistrationData } from '../store/users/usersTypes';
import { type User } from '../types/userTypes'; // We will create this type next

/**
 * Registers a new user. (Admin only feature)
 * @param userData - The new user's username, password, and role.
 */
export const registerUser = async (userData: UserRegistrationData): Promise<User> => {
  const response = await api.post('/users', userData);
  return response.data;
};