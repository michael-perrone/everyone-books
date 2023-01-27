import {GET_KIND_OF_BUSINESS, BOOKING_COLUMNS_ENTERED, GET_NAME_OF_BUSINESS, KIND_BUSINESS_COMPLETED, SAVE_ADMIN_INFO, SAVE_BUSINESS_INFO, ENTER_BUSINESS_SCHEDULE, ADMIN_DROP_DOWN, SET_BOOKING_NUMBER_AND_TYPE, BACK_FUNCTION, REMOVE_CREATE_STATE, RESTAURANT_SEND_HIT} from '../actions/actions';


const initialState = {
    kindOfBusiness: "",
    nameOfBusiness: "",
    kindBusinessCompleted: false,
    restaurantSendNotHit: true,
    adminInfo: {},
    adminInfoComplete: false,
    businessInfo: {},
    businessSchedule: [],
    businessScheduleComplete: false,
    businessInfoComplete: false,
    bookingColumnNumber: "",
    bookingColumnType: "",
    showDropDown: false,
    bookingColumnsComplete: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case REMOVE_CREATE_STATE:
            return {
                ...state,
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
                restaurantSendNotHit: true
            }
        case BOOKING_COLUMNS_ENTERED:
            return {
                ...state,
                bookingColumnsComplete: true
            }
        case BACK_FUNCTION:
            if (state.showDropDown) {
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
        case RESTAURANT_SEND_HIT:
        return {
            ...state,
            restaurantSendNotHit: !state.restaurantSendNotHit
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