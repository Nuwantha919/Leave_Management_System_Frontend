// src/store/__mocks__/store.ts

// This minimal mock prevents Jest from running the actual combineReducers/redux-persist logic.
import { configureStore } from '@reduxjs/toolkit';

// Mock types (must match exports from your real store.ts)
export type RootState = any;
export type AppDispatch = any;

const mockStore = configureStore({
    reducer: {
        // Minimal mock reducers to satisfy combineReducers requirements
        auth: (state = {}) => state,
        leaves: (state = {}) => state,
        users: (state = {}) => state,
        _persist: (state = {}) => state,
    },
});

// Mock exports needed by test files
export const store = mockStore;
export const persistor = {} as any;