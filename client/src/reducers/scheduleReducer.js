import {CHOOSE_EMPLOYEE_FOR_SCHEDULE, SET_YEAR, SET_MONTH,} from '../actions/actions';
import {CHOOSE_SHIFT_TIME_AMOUNT} from '../actions/actions';
import {CHOOSE_DATE_SELECTOR} from '../actions/actions';

const initialState = {
    employeeToSchedule: null,
    timeForBooking: "",
    dateChosen: null,
    year: "",
    month: ""
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MONTH:
        return {
            ...state,
            month: action.payload
        }
        case SET_YEAR: 
        return {
            ...state,
            year: action.payload
        }
        case CHOOSE_DATE_SELECTOR: 
        return {
            ...state,
            dateChosen: action.payload
        }
        case CHOOSE_EMPLOYEE_FOR_SCHEDULE:
            console.log(action.payload)
        return {
            ...state,
            employeeToSchedule: action.payload
            
        }
    
        case CHOOSE_SHIFT_TIME_AMOUNT:
            console.log(action.payload)
        return {
            ...state,
            timeForBooking: action.payload
        }
        default: return state;
    }
}