import { Navigate } from "react-router-dom"
import { useAuthContext } from "../store/contexts/AuthContext"
import React from "react";

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const {authState} = useAuthContext();
    const {isAuthenticated} = authState;
    if (isAuthenticated)
        return children;

    return (
        <Navigate to="/" replace/>
    )
}

export default PrivateRoute;