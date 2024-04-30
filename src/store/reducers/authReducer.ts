import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS, REQUEST_LOGIN, REQUEST_REGISTER } from "../contexts/actionTypes";
import { AuthAction, AuthState } from "../contexts/types";

export const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user,
                token: action.payload.token
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                token: ""
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: ""
            }
        case REQUEST_REGISTER:
            return {
                ...state,
                loading: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}