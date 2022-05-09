import { SHOW_CREATE_BOOKING } from "../actions/actions";


const initialState = {
    showCreateBooking: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SHOW_CREATE_BOOKING:
            return {
                ...state,
                showCreateBooking: !state.showCreateBooking
            }
            default: return state
    }
}