// Setup file for Jest tests

// Mock import.meta for Vite environment variables
/* eslint-disable @typescript-eslint/no-explicit-any */
(global as any).import = {
  meta: {
    env: {
      VITE_API_BASE_URL: 'http://localhost:8080'
    }
  }
};
/* eslint-enable @typescript-eslint/no-explicit-any */

// Suppress console warnings and errors during tests (optional)
// global.console = {
//   ...console,
//   error: jest.fn(),
//   warn: jest.fn(),
// };
