import axios from 'axios';
import { store } from '../store/store'; 

// Create a new Axios instance with a base URL
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

/**
 * Axios Request Interceptor
 * * Before any request is sent, this function runs.
 * It gets the current state from the Redux store, retrieves the auth token,
 * and adds it to the request's Authorization header.
 */
api.interceptors.request.use(
  (config) => {
    // Get the auth state from the Redux store
    const authState = store.getState().auth;
    const token = authState.token;

    // If a token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log(
    //   `Sending API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    //   ` | Auth Token Attached: ${!!token}` // This will print true or false
    // );

    return config; // Continue with the request
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

export default api;