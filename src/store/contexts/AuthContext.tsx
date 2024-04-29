import React, { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { AuthState } from "./types";

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: {children:any}) => {
    const initialState: AuthState = {
        isAuthenticated: false,
        loading: false,
        user: null,
        token: "",
        error: ""
    }

    const [authState, authDispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{authState, authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAutnContext must be used within a AuthContext.Provider")
    }

    return context;
}