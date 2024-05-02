import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../contexts/types";

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    token: "",
    error: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        requestLogin: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
        },
        loginFailure: (state) => {
            state.isAuthenticated = false
            state.loading = false
            state.user = null
            state.token = ""
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.token = ""
        },
        requestRegister: (state) => {
            state.loading = true
        },
        registerSuccess: (state) => {
            state.loading = false
        },
        registerFailure: (state) => {
            state.loading = false
        }
    }
})

export const { requestLogin, loginSuccess, loginFailure, logout,
    requestRegister, registerSuccess, registerFailure
} = authSlice.actions

export default authSlice.reducer