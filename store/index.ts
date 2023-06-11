'use client';

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { baseApi } from './api/base-api';
import { counterReducer } from './slices';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/**
 * Use this instead of plain useDispatch for better TypeScript support.
 * @see https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Use this instead of useSelector for better TypeScript support.
 * @see https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// https://redux-toolkit.js.org/rtk-query/api/setupListeners
setupListeners(store.dispatch);

export default store;
