import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "../contexts/types";
import { jwtDecode } from "jwt-decode";

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: ""
}

export const login = createAsyncThunk(
    'login',
    async ({email, password}: {email: string, password: string}, {rejectWithValue}) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password
            })
        }

        try {
            const response = await fetch('http://localhost:3001/auth/login', requestOptions)
            const data = await (response).json();
            if (response.status !== 200)
                return rejectWithValue(`${data.message}`)
            localStorage.setItem('token', data.token);
            return data
        } catch(error) {
            return rejectWithValue(`${error}`)
        }
    }
)

export const register = createAsyncThunk(
    'register',
    async ({user, password}: {user: User, password: string}, {rejectWithValue}) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...user,
                password
            })
        }

        try {
            const response = await fetch('http://localhost:3001/auth/register', requestOptions)
            if (response.status !== 201)
                return rejectWithValue(`${(await (response).json()).message}`)
            return await (response).json();
        } catch(error) {
            return rejectWithValue(`${error}`)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.loading = false
                state.user = jwtDecode<{user: User}>(action.payload.token).user
                console.log(JSON.stringify(action))
            })
            .addCase(login.rejected, (state) => {
                state.isAuthenticated = false
                state.loading = false
                state.user = null
            })
            .addCase(register.pending, (state) => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(register.rejected, (state) => {
                state.loading = false
            })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer