import { logout } from "../../store/actions/authActions";
import { useAuthContext } from "../../store/contexts/AuthContext"
import { User } from "../../store/contexts/types"

export const Dashboard = () => {
    const { authState, authDispatch } = useAuthContext();
    const user: User = authState.user;

    const handleLogout = () => {
        authDispatch(logout())
    }

    return (
        <>
            <p>
                Welcome! {user.username}
            </p>
            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}