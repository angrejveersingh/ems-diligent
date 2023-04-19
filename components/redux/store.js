import { configureStore } from '@reduxjs/toolkit'
import emsReducer from './emsSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    ems : emsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      ImmutableStateInvariantMiddleware: false
    }),
})