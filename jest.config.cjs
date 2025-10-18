/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use ts-jest preset for TypeScript support
  preset: 'ts-jest', 
  
  // Use jsdom for a typical frontend environment
  testEnvironment: 'jsdom', 
  
  // Instruct Jest where to find test files
  testMatch: [
    "**/__tests__/**/*.ts", 
    "**/__tests__/**/*.tsx",
    "**/?(*.)+(spec|test).ts",
    "**/?(*.)+(spec|test).tsx"
  ],
  
  // Mapping to handle module resolution for 'src/' alias
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  
  // Clear mock history before each test
  clearMocks: true,
  
  // Setup files to run before tests
  setupFiles: ['<rootDir>/src/testUtils/setupTests.ts'],
  
  // Transform configuration for ts-jest
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      }
    }]
  },
  
  // Define global variables for tests
  globals: {
    'import.meta': {
      env: {
        VITE_API_BASE_URL: 'http://localhost:8080'
      }
    }
  }
};