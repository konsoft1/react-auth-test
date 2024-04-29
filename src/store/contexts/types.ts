export type AuthState = {
    isAuthenticated: boolean
    loading: boolean
    user: User | null
    token: string
    error: string
}

export type User = {
    id: string
    username: string
    email: string
}

export type AuthAction = {
    type: string
    payload: any
}