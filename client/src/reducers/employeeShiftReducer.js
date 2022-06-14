import {EXIT_NUM} from '../actions/actions'

const initialState = {
    exitNum: 0
}


export default function employeeShiftReducer(state = initialState, action) {
    if (action.type === EXIT_NUM) {
        console.log("hello");
        return {
            ...state,
            exitNum: state.exitNum + 1
        }
    }
    else {
        return initialState;
    }
}