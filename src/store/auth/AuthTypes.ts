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

/**
 * Interface for the user details payload (what the Thunk returns).
 */
export interface UserInfo {
  username: string;
  role: string;
  token: string;
}

/**
 * Interface for the complete authentication state stored in the Redux slice.
 * Note: 'username' and 'password' are kept here to manage the form inputs
 * in the Login component via Redux (as you currently have it).
 */
export interface AuthState {
  username: string;
  password: string; 
  
  token: string | null;
  role: string | null;
  
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}