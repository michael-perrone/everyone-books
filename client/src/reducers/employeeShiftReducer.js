import {TWO_SHIFTS_NO_BREAK, TWO_SHIFTS_ONE_BREAK, TWO_SHIFTS_TWO_BREAKS, ONE_SHIFT_NO_BREAK, ONE_SHIFT_ONE_BREAK} from '../actions/actions'

const initialState = {
    oneShift: '',
    twoShifts: '',
    oneBreak: '',
    twoBreaks: '',
    noBreak: '',
    onlyShiftStarts:'',
    onlyShiftEnds:'',
    firstShiftStarts: '',
    secondShiftStarts: '',
    firstShiftEnds: '',
    secondShiftEnds:'',
    onlyBreakStarts: '',
    onlyBreakEnds: '',
    firstBreakStarts: '',
    firstBreakEnds: '',
    secondBreakStarts: '',
    secondBreakEnds: '',
    notScheduled: ""
}


export default function employeeShiftReducer(state = initialState, action) {
    switch(action.type) {
        case ONE_SHIFT_ONE_BREAK:
            return {
                ...state,
                onlyShiftStarts: action.payload.onlyShiftStarts,
                onlyShiftEnds: action.payload.onlyShiftEnds,
                onlyBreakStarts: action.payload.onlyBreakStarts,
                onlyBreakEnds: action.payload.onlyBreakEnds
            }
        case ONE_SHIFT_NO_BREAK:
            return {
                ...state,
                onlyShiftStarts: action.payload.onlyShiftStarts,
                onlyShiftEnds: action.payload.onlyShiftEnds
            }
        case TWO_SHIFTS_NO_BREAK:
            return {
                ...state,
                firstShiftStarts: action.payload.firstShiftStarts,
                firstShiftEnds: action.payload.firstShiftEnds,
                secondShiftStarts: action.payload.secondShiftStarts,
                secondShiftEnds: action.payload.secondShiftEnds
            }
        case TWO_SHIFTS_ONE_BREAK:
            return {
                ...state,
                firstShiftStarts: action.payload.firstShiftStarts,
                firstShiftEnds: action.payload.firstShiftEnds,
                secondShiftStarts: action.payload.secondShiftStarts,
                secondShiftEnds: action.payload.secondShiftEnds,
                onlyBreakStarts: action.payload.onlyBreakStarts,
                onlyBreakEnds: action.payload.onlyBreakEnds
            }
        case TWO_SHIFTS_TWO_BREAKS:
            return {
                ...state,
                firstShiftStarts: action.payload.firstShiftStarts,
                firstShiftEnds: action.payload.firstShiftEnds,
                secondShiftStarts: action.payload.secondShiftStarts,
                secondShiftEnds: action.payload.secondShiftEnds,
                firstBreakStarts: action.payload.firstBreakStarts,
                firstBreakEnds: action.payload.firstBreakEnds,
                secondBreakEnds: action.payload.secondBreakEnds,
                secondBreakStarts: action.payload.secondBreakStarts
            }
        default: 
        return {...state}
    }
}