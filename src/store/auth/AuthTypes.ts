export interface LoginRequestData {
  username: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  username: string;
  role: string;
  message: string;
}

export interface UserInfo {
  username: string;
  role: string;
  token: string;
}

export interface AuthState {
  username: string | null; 
  token: string | null;
  role: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}