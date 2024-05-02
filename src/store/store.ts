import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice'
import { profileApi } from "../hook/apiServices";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [profileApi.reducerPath]: profileApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(profileApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch