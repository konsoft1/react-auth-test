export type AuthState = {
    isAuthenticated: boolean
    loading: boolean
    user: User | null
    error: string
}

export type User = {
    id?: string
    firstName: string
    lastName: string
    email: string
}