import {CHOOSE_EMPLOYEE_FOR_SCHEDULE, SET_YEAR, SET_MONTH,} from '../actions/actions';
import {CHOOSE_SHIFT_TIME_AMOUNT} from '../actions/actions';
import {CHOOSE_DATE_SELECTOR} from '../actions/actions';

const initialState = {
    dateChosen: new Date().toDateString(),
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case CHOOSE_DATE_SELECTOR: 
        return {
            ...state,
            dateChosen: action.payload
        }
       default: return state;
    }
}