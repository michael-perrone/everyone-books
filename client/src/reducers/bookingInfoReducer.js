import {
  BOOKING_TYPE,
  TIME_SELECTED,
  INSTRUCTOR_CHOSEN
} from "../actions/actions";

const initialState = {
  bookingType: "",
  timeSelected: "",
  instructorChosen: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOKING_TYPE:
      return { ...state, bookingType: action.payload };
    case TIME_SELECTED:
      return { ...state, timeSelected: action.payload };
    case INSTRUCTOR_CHOSEN:
      return { ...state, instructorChosen: action.payload };
    default:
      return state;
  }
}
