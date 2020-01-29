import {CHOOSE_EMPLOYEE_FOR_SCHEDULE,} from '../actions/actions';
import {CHOOSE_SHIFT_TIME_AMOUNT} from '../actions/actions';
import {CHOOSE_WEEK_SELECTOR} from '../actions/actions';

const initialState = {
    employeeToSchedule: null,
    timeForBooking: "",
    weekChosen: null
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case CHOOSE_WEEK_SELECTOR: 
        return {
            ...state,
            weekChosen: action.payload
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