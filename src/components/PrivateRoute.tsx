import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hook/store";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token')
    let isAuthorized = true
    if (!token) isAuthorized = false
    else {
        const decoded = jwtDecode(token)
        if ((decoded.exp ? decoded.exp : 0) * 1000 < Date.now())
            isAuthorized = false
    }
    if (isAuthorized)
        return children;

    return (
        <Navigate to="/" replace />
    )
}

export default PrivateRoute;