import {
  BOOKING_TYPE,
  TIME_SELECTED,
  EMPLOYEE_CHOSEN
} from "../actions/actions";

const initialState = {
  bookingType: "",
  timeSelected: "",
  employeeChosen: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOKING_TYPE:
      return { ...state, bookingType: action.payload };
    case TIME_SELECTED:
      return { ...state, timeSelected: action.payload };
    case EMPLOYEE_CHOSEN:
      return { ...state, employeeChosen: action.payload };
    default:
      return state;
  }
}
