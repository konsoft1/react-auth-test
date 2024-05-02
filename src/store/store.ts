import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch