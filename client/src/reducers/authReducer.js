import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  INSTRUCTOR_LOGIN_SUCCESS,
  INSTRUCTOR_LOGOUT,
  USER_REGISTER_SUCCESS,
  ADMIN_REGISTER_SUCCESS,
  INSTRUCTOR_REGISTER_SUCCESS,
  GET_INSTRUCTOR_PROFILE
} from "../actions/actions";
import decoder from "jwt-decode";

const initalState = {
  instructorProfile: {},
  token: localStorage.getItem("token"),
  instructorToken: localStorage.getItem("instructorToken"),
  adminToken: localStorage.getItem("adminToken"),
  isUserAuthenticated: localStorage.getItem("token") ? true : false,
  isAdminAuthenticated: localStorage.getItem("adminToken") ? true : false,
  isInstructorAuthenticated: localStorage.getItem("instructorToken")
    ? true
    : false,
  loading: false,
  isAuthenticated:
    localStorage.getItem("token") ||
    localStorage.getItem("instructorToken") ||
    localStorage.getItem("adminToken")
      ? true
      : false,
  user: localStorage.getItem("token")
    ? decoder(localStorage.getItem("token"))
    : null,
  admin: localStorage.getItem("adminToken")
    ? decoder(localStorage.getItem("adminToken"))
    : null,
  instructor: localStorage.getItem("instructorToken")
    ? decoder(localStorage.getItem("instructorToken"))
    : null
};

export default function(state = initalState, action) {
  switch (action.type) {
    case INSTRUCTOR_LOGIN_SUCCESS:
      localStorage.setItem("instructorToken", action.payload.instructorToken);
      return {
        ...state,
        isAuthenticated: true,
        isInstructorAuthenticated: true,
        instructorToken: localStorage.getItem("instructorToken"),
        instructor: decoder(localStorage.getItem("instructorToken"))
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
    case INSTRUCTOR_REGISTER_SUCCESS:
      localStorage.setItem("instructorToken", action.payload.instructorToken);
      return {
        ...state,
        isAuthenticated: true,
        isInstructorAuthenticated: true,
        instructorToken: localStorage.getItem("instructorToken"),
        instructor: decoder(localStorage.getItem("instructorToken"))
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
    case INSTRUCTOR_LOGOUT:
      localStorage.removeItem("instructorToken");
      return {
        ...state,
        instructorProfile: {},
        isAuthenticated: false,
        isInstructorAuthenticated: false,
        instructor: null,
        instructorToken: null
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
