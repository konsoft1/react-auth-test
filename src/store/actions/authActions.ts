import { jwtDecode } from "jwt-decode"
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS, REQUEST_LOGIN, REQUEST_REGISTER } from "../contexts/actionTypes"
import { User } from "../contexts/types"

export const requestLogin = () => ({
    type: REQUEST_LOGIN
})

export const loginSuccess = (user: User, token: string) => ({
    type: LOGIN_SUCCESS,
    payload: {
        user,
        token
    }
})

export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: {
        error
    }
})

export const login = async (email: string, password: string) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email,
            password
        })
    }

    try {
        let data = await (await fetch('http://localhost:3001/auth/login', requestOptions)).json();
        // let data: any = {
        //     user: {
        //         id: 'fake-id',
        //         username: 'jonathan',
        //         email: 'jonathan940108@outlook.com'
        //     },
        //     token: 'fake-token'
        // }
        let {token} = data
        let {user}: {user: User} = jwtDecode(token)

        if (user) {
            console.log('>>>', `Token: ${token}`)
            return loginSuccess(user, token);
        }

        return loginFailure(data.error || data.message);
    } catch(error) {
        return loginFailure(`${error}`);
    }
}

export const logout = () => ({
    type: LOGOUT
})

export const requestRegister = () => ({
    type: REQUEST_REGISTER
})

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
})

export const registerFailure = (error: string) => ({
    type: REGISTER_FAILURE,
    payload: {
        error
    }
})

export const register = async (user: User, password: string) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ...user,
            password
        })
    }

    try {
        let data = await (await fetch('http://localhost:3001/auth/register', requestOptions)).json();
        // let data: any = {
        //     user: {
        //         id: 'fake-id',
        //         username: 'jonathan',
        //         email: 'jonathan940108@outlook.com'
        //     },
        //     token: 'fake-token'
        // }

        if (data.status === 'success') {
            return registerSuccess();
        }

        return registerFailure(data.error || data.message);
    } catch(error) {
        return registerFailure(`${error}`);
    }
}