import {EMPLOYEE_SHIFT_ERROR} from '../actions/actions'
import {BREAK_ALERT} from '../actions/actions';

const initialState = {
    employeeShiftError: false,
    breakAlert: ""
}

export default function alertReducer(state = initialState, action) {
    switch(action.type) {
        case BREAK_ALERT:
            return {
                ...state,
                breakAlert: action.payload
            }
        case EMPLOYEE_SHIFT_ERROR:
            return {
                ...state,
                employeeShiftError: action.payload
            } 
        default:
            return state;
    }
}