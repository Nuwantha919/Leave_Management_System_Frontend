import axios from 'axios'; 
import type { 
  LoginRequestData, 
  LoginResponseData 
} from './../store/auth/AuthTypes'; 

/**
 * Calls the public /login endpoint.
 * We use a direct axios call here because it's a public route and
 * outside our '/api' base path which is configured for authenticated routes.
 */
export const login = async (
  credentials: LoginRequestData
): Promise<LoginResponseData> => {
  try {
    const response = await axios.post('http://localhost:8080/login', credentials);
    return response.data;
  } catch (error: any) {
    // Re-throw a cleaner error message for the thunk to catch
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('An unknown login error occurred.');
  }
};