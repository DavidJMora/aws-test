import {
    AUTH_USER_SUCCESSFUL,
    AUTH_USER_LOGOUT,
    AUTH_SIGNUP_SUCCESSFUL,
    AUTH_USER_FAILURE
} from '../actionTypes/actionTypes';
import setAuthToken from '../../lib/setAuthToken';
import Axios from '../../lib/Axios';

export const signup = (userInfo) => async dispatch => {
    try {
        let success = await Axios.post('/users/signup', userInfo);
        dispatch(handleSignupSuccess(success.data.message));
        return Promise.resolve(success.data.message)
    } catch (error) {
        return Promise.reject(error);
    }
}

export const signin = (userInfo) => async dispatch => {
    try {
        let success = await Axios.post('/users/signin', userInfo);

        const { token } = success.data;

        dispatch(setUserSuccessful(token));
        setAuthToken(token);
        localStorage.setItem('jwtToken', token);
        return Promise.resolve('Signin successful!');
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch({
        type: AUTH_USER_LOGOUT
    });
}

export const setUserSuccessful = (userInfo) => dispatch => {
    dispatch({
        type: AUTH_USER_SUCCESSFUL,
        payload: userInfo
    })
}

const handleSignupSuccess = (message) => dispatch => {
    dispatch({
        type: AUTH_SIGNUP_SUCCESSFUL,
        payload: message
    })

}

export const handleErrorSignup = (message) => dispatch => {
    dispatch({
        type: AUTH_USER_FAILURE,
        payload: message
    })
}