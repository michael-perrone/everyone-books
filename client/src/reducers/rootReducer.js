import booleanReducers from "./booleanReducers";
import authReducer from "./authReducer";
import bookingInfoReducer from "./bookingInfoReducer";
import newReducers from './newReducers';
import dateReducer from './dateReducer';
import scheduleReducer from './scheduleReducer';
import { combineReducers } from "redux";

export default combineReducers({
  booleanReducers,
  authReducer,
  bookingInfoReducer,
  newReducers,
  scheduleReducer,
  dateReducer
});
