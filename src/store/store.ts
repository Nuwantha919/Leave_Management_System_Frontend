// src/store/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './auth/authSlice';
import leavesReducer from './leaves/leavesSlice';
import usersReducer from './users/usersSlice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // The key for the storage object in localStorage
  storage, // The storage engine (localStorage)
  whitelist: ['auth'], // IMPORTANT: We only save the 'auth' slice. 'leaves' will be fresh on each load.
};

// Combine all reducers before wrapping them with the persistor
const rootReducer = combineReducers({
  auth: authReducer,
  leaves: leavesReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the new persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // This is required to avoid errors with non-serializable data used by redux-persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;