import {GET_KIND_OF_BUSINESS, GET_NAME_OF_BUSINESS, KIND_BUSINESS_COMPLETED, SAVE_ADMIN_INFO, SAVE_BUSINESS_INFO} from '../actions/actions';


const initialState = {
    kindOfBusiness: "",
    nameOfBusiness: "",
    kindBusinessCompleted: false,
    adminInfo: {},
    adminInfoComplete: false,
    businessInfo: {}
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
        case SAVE_ADMIN_INFO:
            return {
                ...state,
                adminInfoComplete: true,
                adminInfo: action.payload
        }
        case SAVE_BUSINESS_INFO: {
            return {
                ...state,
                businessInfoComplete: true,
                businessInfo: action.payload
            }
        }
      
        default: 
        return state;

    }
}