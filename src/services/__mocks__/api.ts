// Mock for api.ts to avoid import.meta issues in tests
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
});

export default api;
