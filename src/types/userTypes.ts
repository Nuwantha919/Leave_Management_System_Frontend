export interface User {
  username: string;
  role: 'ADMIN' | 'EMPLOYEE';
  maximumLeaveCount: number;
}

export interface UserRegistrationResponse {
  username: string;
  role: string;
  maximumLeaveCount: number;
  message: string;
}