import {GET_KIND_OF_BUSINESS, GET_NAME_OF_BUSINESS, KIND_BUSINESS_COMPLETED, SAVE_ADMIN_INFO, SAVE_BUSINESS_INFO, ENTER_BUSINESS_SCHEDULE, ADMIN_DROP_DOWN, SET_BOOKING_NUMBER_AND_TYPE, BACK_FUNCTION} from '../actions/actions';


const initialState = {
    kindOfBusiness: "",
    nameOfBusiness: "",
    kindBusinessCompleted: false,
    adminInfo: {},
    adminInfoComplete: false,
    businessInfo: {},
    businessSchedule: [],
    businessScheduleComplete: false,
    businessInfoComplete: false,
    bookingColumnNumber: "",
    bookingColumnType: "",
    showDropDown: false,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case BACK_FUNCTION:
        console.log(state.showDropDown, state.businessScheduleComplete, state.businessInfoComplete, state.adminInfoComplete, state.showDropDown)
            if (state.showDropDown) {
                console.log('hi')
                return {
                    ...state,
                    showDropDown: false,
                }
            }
            else if (state.businessScheduleComplete) {
                return {
                    ...state,
                    businessScheduleComplete: false,
                }
            }
            else if (state.businessInfoComplete) {
                return {
                    ...state,
                    businessInfoComplete: false
                }
            }
            else if (state.adminInfoComplete) {
                return {
                    ...state, 
                    adminInfoComplete: false,
               }   
            }
            else if (state.kindBusinessCompleted) {
                return {
                    ...state, 
                    kindBusinessCompleted: false,
                    nameOfBusiness:"",
                    kindOfBusiness: ""
                }
            
            } else {
                return {...state}
            }
        case ADMIN_DROP_DOWN:
        return {
            ...state,
            showDropDown: true
        }
        case SET_BOOKING_NUMBER_AND_TYPE: 
        return {
            ...state,
            bookingColumnNumber: action.payload.bookingColumnNumber,
            bookingColumnType: action.payload.bookingColumnType
        }
        case ENTER_BUSINESS_SCHEDULE:
        return {
            ...state,
            businessSchedule: action.payload,
            businessScheduleComplete: true
        }
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