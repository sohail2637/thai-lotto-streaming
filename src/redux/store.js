import { configureStore } from "@reduxjs/toolkit";
import coreReducer from "./time-line-reducers";
export default configureStore({
  reducer: {
    timeline: coreReducer,
  },
});
