/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use ts-jest preset for TypeScript support
  preset: 'ts-jest', 
  
  // Use jsdom for a typical frontend environment
  testEnvironment: 'jsdom', 
  
  // Instruct Jest where to find test files
  testMatch: [
    "**/__tests__/**/*.ts", 
    "**/?(*.)+(spec|test).ts"
  ],
  
  // Mapping to handle module resolution for 'src/' alias
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  
  // Clear mock history before each test
  clearMocks: true,
};