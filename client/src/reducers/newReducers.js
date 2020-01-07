import {GET_KIND_OF_BUSINESS, GET_NAME_OF_BUSINESS} from '../actions/actions';


const initialState = {
    kindOfBusiness: "",
    nameOfBusiness: ""
};

export default function (state = initialState, action) {
    switch(action.type) {
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