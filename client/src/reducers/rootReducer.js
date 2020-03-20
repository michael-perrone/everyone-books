import booleanReducers from "./booleanReducers";
import authReducer from "./authReducer";
import bookingInfoReducer from "./bookingInfoReducer";
import newReducers from './newReducers';
import dateReducer from './dateReducer';
import scheduleReducer from './scheduleReducer';
import employeeShiftReducer from './employeeShiftReducer'
import alertReducer from './alertReducer';
import { combineReducers } from "redux";

export default combineReducers({
  alertReducer,
  booleanReducers,
  authReducer,
  bookingInfoReducer,
  newReducers,
  scheduleReducer,
  employeeShiftReducer,
  dateReducer
});
