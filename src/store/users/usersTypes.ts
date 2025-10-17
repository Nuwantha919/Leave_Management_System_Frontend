import { type User } from '../../types/userTypes';

export interface UserRegistrationData {
  username: string;
  password: string;
  role: string;
}

export interface UsersState {
  users: User[]; // This will hold a list of all users
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}