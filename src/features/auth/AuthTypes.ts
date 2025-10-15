export interface AuthState {
  username: string;
  password: string; // Used temporarily for form input
  token: string | null;
  user: { id: number; name: string; role: string } | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Interface for the payload when submitting login credentials
export interface LoginCredentials {
  username: string;
  password: string;
}