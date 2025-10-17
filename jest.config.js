/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use ts-jest preset to handle TypeScript files
  preset: 'ts-jest', 
  
  // Use jsdom for a typical frontend environment (good for React utility testing)
  // Use 'node' if you only test pure backend logic. 'jsdom' is safer for frontend projects.
  testEnvironment: 'jsdom', 
  
  // Jest will look for test files in these locations/formats:
  // - Files inside any folder named __tests__ (our chosen structure)
  // - Files ending in .test.ts or .spec.ts
  testMatch: [
    "**/__tests__/**/*.ts?(x)", 
    "**/?(*.)+(spec|test).ts?(x)"
  ],
  
  // Mapping to handle module resolution, especially imports starting with 'src/'
  moduleNameMapper: {
    // If you use path aliases like '@/...' or 'src/...'
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
};