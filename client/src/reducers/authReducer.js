import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGOUT,
  USER_REGISTER_SUCCESS,
  ADMIN_REGISTER_SUCCESS,
  EMPLOYEE_REGISTER_SUCCESS,
  GET_INSTRUCTOR_PROFILE,
  CHANGE_TOKENS
} from "../actions/actions";
import decoder from "jwt-decode";

const initalState = {
  instructorProfile: {},
  token: localStorage.getItem("token"),
  employeeToken: localStorage.getItem("employeeToken"),
  adminToken: localStorage.getItem("adminToken"),
  isUserAuthenticated: localStorage.getItem("token") ? true : false,
  user: localStorage.getItem("token")
    ? decoder(localStorage.getItem("token"))
    : null,
  admin: localStorage.getItem("adminToken")
    ? decoder(localStorage.getItem("adminToken"))
    : null,
  employee: localStorage.getItem("employeeToken")
    ? decoder(localStorage.getItem("employeeToken"))
    : null
};

export default function(state = initalState, action) {
  switch (action.type) {
    case CHANGE_TOKENS:
      localStorage.removeItem('employeeToken')
      localStorage.setItem('employeeToken', action.payload.employeeToken)
      return {
        ...state,
        employeeToken: action.payload.employeeToken,
        employee: decoder(action.payload.employeeToken)
      }
    case EMPLOYEE_LOGIN_SUCCESS:
      localStorage.setItem("employeeToken", action.payload.employeeToken);
      return {
        ...state,
        employeeToken: localStorage.getItem("employeeToken"),
        employee: decoder(localStorage.getItem("employeeToken"))
      };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isUserAuthenticated: true,
        token: localStorage.getItem("token"),
        user: decoder(localStorage.getItem("token"))
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("adminToken", action.payload.adminToken);
      return {
        ...state,
        isAuthenticated: true,
        isAdminAuthenticated: true,
        admin: decoder(localStorage.getItem("adminToken")),
        adminToken: localStorage.getItem("adminToken")
      };
    case EMPLOYEE_REGISTER_SUCCESS:
      localStorage.setItem("employeeToken", action.payload.employeeToken);
      return {
        ...state,
        employeeToken: localStorage.getItem("employeeToken"),
        employee: decoder(localStorage.getItem("employeeToken"))
      };
    case USER_REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isUserAuthenticated: true,
        token: localStorage.getItem("token"),
        user: decoder(localStorage.getItem("token"))
      };
    case ADMIN_REGISTER_SUCCESS:
      localStorage.setItem("adminToken", action.payload.adminToken);
      return {
        ...state,
        isAuthenticated: true,
        isAdminAuthenticated: true,
        admin: decoder(localStorage.getItem("adminToken")),
        adminToken: localStorage.getItem("adminToken")
      };
    case GET_INSTRUCTOR_PROFILE:
      return {
        ...state,
        instructorProfile: action.payload
      };
    case USER_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        isUserAuthenticated: false,
        user: null,
        token: null
      };
    case ADMIN_LOGOUT:
      localStorage.removeItem("adminToken");
      return {
        ...state,
        isAuthenticated: false,
        isAdminAuthenticated: false,
        admin: null,
        adminToken: null
      };
    case EMPLOYEE_LOGOUT:
      localStorage.removeItem("employeeToken");
      return {
        ...state,
        instructorProfile: {},
        employee: null,
        employeeToken: null
      };

    /*    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      const token = decoder(state.token);
      return {
        ...state,
        ...action.payload,
        user: token.user.username,
        isAuthenticated: true,
        loading: true
      }; */
    /*  case REGISTER_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }; */
    default:
      return state;
  }
}
