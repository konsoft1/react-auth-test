import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hook/store";

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const authState = useAppSelector((state) => state.auth)
    const {isAuthenticated} = authState;
    if (isAuthenticated)
        return children;

    return (
        <Navigate to="/" replace/>
    )
}

export default PrivateRoute;