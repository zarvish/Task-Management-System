import { combineReducers } from "@reduxjs/toolkit";
import slice from "./slice";
const rootReducer = combineReducers({
  slice: slice,
});

export default rootReducer;
