import type { 
  LoginRequestData, 
  LoginResponseData 
} from '../features/auth/AuthTypes'; 

const BASE_URL = 'http://localhost:8080'; 

/**
 * Calls the Spring Boot /login endpoint.
 */
export async function login(
  credentials: LoginRequestData
): Promise<LoginResponseData> {
  
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  console.log('Response status:', response.status); // Debug log
  const data = await response.json();

  if (!response.ok) {
    // Throws the backend's error message (e.g., "Invalid username or password.")
    const errorMessage = data.message || 'Login failed due to a network error.';
    throw new Error(errorMessage); 
  }

  // Store the token immediately
  localStorage.setItem('authToken', data.token);

  // Return the successful data
  return data as LoginResponseData;
}