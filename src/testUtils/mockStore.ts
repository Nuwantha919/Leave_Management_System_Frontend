// src/testUtils/mockStore.ts

import configureMockStore from 'redux-mock-store';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { RootState } from './types'; // Import your types

// 1. Define the required middleware (Thunk is essential for async actions)
const middlewares = [thunk as ThunkMiddleware<RootState>]; 

// 2. Configure the mock store creator
const mockStore = configureMockStore<RootState, typeof middlewares>(middlewares);

export default mockStore;

// Helper type for the actual mock store instance used in tests
export type MockStore = ReturnType<typeof mockStore>;