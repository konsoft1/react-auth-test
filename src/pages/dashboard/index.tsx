import { useEffect, useState } from "react";
import { User } from "../../store/contexts/types"
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from "../../hook/store";
import { logout } from "../../store/reducers/authSlice";
import { useGetProfileQuery } from "../../hook/apiServices";

export const Dashboard = () => {
    const authState = useAppSelector((state) => state.auth)
    const authDispatch = useAppDispatch()
    const user: User | null = authState.user;

    const { data, error, isLoading, refetch } = useGetProfileQuery(authState.token)

    const handleLogout = () => {
        authDispatch(logout())
    }

    const handleReloadProfile = () => {
        refetch()
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
                {
                    error ? 'Oh, error!'
                    : isLoading ? 'Loading...'
                    : JSON.stringify(data)
                }
            </p>
            <button onClick={handleReloadProfile}>
                Reload Profile
            </button>
        </div>
    )
}