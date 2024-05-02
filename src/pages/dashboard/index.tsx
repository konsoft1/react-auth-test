import { useEffect, useState } from "react";
import { User } from "../../store/contexts/types"
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from "../../hook/store";
import { logout } from "../../store/reducers/authSlice";

export const Dashboard = () => {
    const authState = useAppSelector((state) => state.auth)
    const authDispatch = useAppDispatch()
    const user: User | null = authState.user;

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
                Welcome, {user?.firstName} {user?.lastName}!
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