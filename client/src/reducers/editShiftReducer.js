import { EDIT_SHIFT } from "../actions/actions";
import { DONE_EDITING} from "../actions/actions";


const initialState = {
    editingShift: false,
    shift: {
        isBreak: "",
        breakStart: "",
        breakEnd: "",
        shiftStart: "",
        shiftEnd: "",
        employee: "",
        bcn: "",
    }
}

export default function editShiftReducer(state = initialState, action) {
    if (action.type === EDIT_SHIFT) {
        console.log(action)
        return {
            ...state,
            editingShift: true,
            shift: action.payload
        }
    }
    else if (action.type === DONE_EDITING ) {
        return {
            ...state,
            editingShift: false
        }
    }
    else {
        return {...state};
    }
}