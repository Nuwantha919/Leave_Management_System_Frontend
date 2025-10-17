// src/store/auth/AuthTypes.ts

export interface LoginRequestData {
  username: string;
  password: string;
}

// ... (LoginRequestData) ...

export interface LoginResponseData {
  token: string;
  username: string;
  role: string;
  message: string;
  maximumLeaveCount: number;
  leavesTaken: number;
  leaveBalance: number;
}

export interface UserInfo {
  username: string;
  role: string;
  token: string;
  maximumLeaveCount: number;
  leavesTaken: number;
  leaveBalance: number;
}

export interface AuthState {
  username: string | null;
  token: string | null;
  role: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  maximumLeaveCount: number | null;
  leavesTaken: number | null;
  leaveBalance: number | null;
}