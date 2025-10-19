import axios from 'axios'; 
import type { 
  LoginRequestData, 
  LoginResponseData 
} from './../store/auth/AuthTypes'; 

/**
 * Calls the public /login endpoint through nginx proxy.
 * Nginx will forward /login to backend:8080/login internally.
 */
export const login = async (
  credentials: LoginRequestData
): Promise<LoginResponseData> => {
  try {
    // Use relative URL - nginx will proxy to backend
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const response = await axios.post(`${baseUrl}/login`, credentials);
    return response.data;
  } catch (error: any) {
    // Re-throw a cleaner error message for the thunk to catch
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('An unknown login error occurred.');
  }
};