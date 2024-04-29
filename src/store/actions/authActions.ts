import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REQUEST_LOGIN } from "../contexts/actionTypes"
import { User } from "../contexts/types"

export const requestLogin = () => ({
    type: REQUEST_LOGIN,
    payload: {
        loading: true
    }
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
        let data = await (await fetch('http://localhost:3001', requestOptions)).json();
        // let data: any = {
        //     user: {
        //         id: 'fake-id',
        //         username: 'jonathan',
        //         email: 'jonathan940108@outlook.com'
        //     },
        //     token: 'fake-token'
        // }

        if (data.user) {
            return loginSuccess(data.user, data.token);
        }

        return loginFailure(data.error);
    } catch(error) {
        return loginFailure(`${error}`);
    }
}

export const logout = () => ({
    type: LOGOUT
})