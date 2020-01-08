import {GET_KIND_OF_BUSINESS, GET_NAME_OF_BUSINESS, KIND_BUSINESS_COMPLETED} from '../actions/actions';


const initialState = {
    kindOfBusiness: "",
    nameOfBusiness: "",
    kindBusinessCompleted: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case KIND_BUSINESS_COMPLETED:
            return {
                ...state,
                kindBusinessCompleted: true,
            }
        case GET_KIND_OF_BUSINESS:
            return {
                ...state,
                kindOfBusiness: action.payload
            }
        case GET_NAME_OF_BUSINESS:
            return {
                ...state,
                nameOfBusiness: action.payload
            }
        default: 
        return state;

    }
}