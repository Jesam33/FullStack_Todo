import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import todoReducer from "./todosSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      todo: todoReducer,
    },
  });

export const wrapper = createWrapper(makeStore);

export default wrapper;
