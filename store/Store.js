import { configureStore } from "@reduxjs/toolkit";
import TestSlice from "./TestSlice";
import ShiftSlice from "./ShiftSlice";

export const Store = configureStore({
  reducer: {
    test: TestSlice,
    shift: ShiftSlice
  },
});
