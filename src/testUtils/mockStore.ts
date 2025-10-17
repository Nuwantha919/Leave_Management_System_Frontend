import configureMockStore from 'redux-mock-store';
// Use the named import
import { thunk } from 'redux-thunk'; 
import { RootState, AppDispatch } from '../store/store'; 

// CRITICAL FIX: To resolve the TS2345 error, use 'any[]' for the middleware.
// This is the accepted fix for this specific Redux-Mock-Store/TypeScript clash.
const middlewares: any[] = [thunk]; 

// Configure the mock store creator using your RootState and AppDispatch types
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares);

export default mockStore;

export type MockStore = ReturnType<typeof mockStore>;