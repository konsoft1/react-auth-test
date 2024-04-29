import { LOGIN_SUCCESS, LOGOUT, REQUEST_LOGIN } from "../contexts/actionTypes";
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
                token: action.payload.auth_token
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: ""
            }
        default:
            return state
    }
}