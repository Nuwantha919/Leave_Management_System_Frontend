// src/services/__mocks__/leaveService.ts

// Mock the core API functions used by leavesThunks.ts
export const fetchMyLeaves = jest.fn();
export const fetchAllLeaves = jest.fn();
export const createLeave = jest.fn();
export const updateLeave = jest.fn();
export const updateLeaveStatus = jest.fn();
export const deleteLeave = jest.fn();

// Note: Jest's automatic mocking will replace the real implementations 
// in leavesThunks.ts with these controllable mock functions.