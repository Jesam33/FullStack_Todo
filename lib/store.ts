import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import crudOperations from './features/crudOperations';

// Define makeStore function
const makeStore: MakeStore<ReturnType<typeof configureStore>> = () => configureStore({
  reducer: {
    crudTodo: crudOperations,
  },
});

// Define RootState using makeStore
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;

// Define AppDispatch using makeStore
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

// Create wrapper
export const wrapper = createWrapper<ReturnType<typeof configureStore>>(makeStore);
