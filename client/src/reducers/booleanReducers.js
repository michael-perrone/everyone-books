import {
  INSTRUCTOR_WANTS_TO_REGISTER,
  HIDE_SCHEDULE
} from "../actions/actions";
import { ADMIN_ENTERED } from "../actions/actions";
import {
  SHOW_NOTIFICATIONS,
  HIDE_NOTIFICATIONS,
  BOOK_A_COURT,
  SHOW_SCHEDULE,
  SHOW_DROP_DOWN,
} from "../actions/actions";

const initialState = {
  instructorRegister: false,
  showDropDown: undefined,
  adminEntered: false,
  showNotifications: false,
  hideNotifications: true,
  bookACourt: false,
  showSchedule: false,
  hideSchedule: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_DROP_DOWN:
    return {
      ...state,
      showDropDown: !state.showDropDown
    }
    case SHOW_SCHEDULE:
      return {
        ...state,
        showSchedule: true,
        hideSchedule: false
      };
    case HIDE_SCHEDULE:
      return {
        ...state,
        showSchedule: false,
        hideSchedule: true
      };
    case INSTRUCTOR_WANTS_TO_REGISTER:
      return {
        ...state,
        instructorRegister: !state.instructorRegister
      };
    case BOOK_A_COURT:
      return {
        ...state,
        bookACourt: true
      };
    case SHOW_NOTIFICATIONS:
      return {
        ...state,
        showNotifications: true,
        hideNotifications: false
      };
    case HIDE_NOTIFICATIONS:
      return {
        ...state,
        showNotifications: false,
        hideNotifications: true
      };

    case ADMIN_ENTERED:
      return {
        ...state,
        adminEntered: !state.adminEntered
      };

    default: {
      return state;
    }
  }
}
