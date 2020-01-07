import booleanReducers from "./booleanReducers";
import authReducer from "./authReducer";
import bookingInfoReducer from "./bookingInfoReducer";

import { combineReducers } from "redux";

export default combineReducers({
  booleanReducers,
  authReducer,
  bookingInfoReducer
});
