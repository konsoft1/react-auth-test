import { useEffect, useState } from "react";
import { logout } from "../../store/actions/authActions";
import { useAuthContext } from "../../store/contexts/AuthContext"
import { User } from "../../store/contexts/types"
import styles from './index.module.scss';

export const Dashboard = () => {
    const { authState, authDispatch } = useAuthContext();
    const user: User = authState.user;

    const [profile, setProfile] = useState('');

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        fetch('http://localhost:3001/profile', requestOptions)
            .then(async response => {
                setProfile(await response.text())
            })
    }, [profile])

    const handleLogout = () => {
        authDispatch(logout())
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                Welcome, {user.firstName} {user.lastName}!
            </p>
            <button onClick={handleLogout}>
                Logout
            </button>
            <p className={styles.profile}>
                {profile}
            </p>
        </div>
    )
}