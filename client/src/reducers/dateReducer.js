import {CHOOSE_DATE} from '../actions/actions'


const initialState = {
    dateChosen: new Date(),
}


export default function dateReducer(state = initialState, action) {
    switch(action.type) {
        case CHOOSE_DATE:
            return {
                ...state,
                dateChosen: action.payload.dateChosen
            }
        default: return state;
    }
}