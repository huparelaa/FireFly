import axios from 'axios'
import Swal from 'sweetalert2'
import  axiosInstance from '/home/julianv/FireFly/frontend/src/apiConnection.js'


import {
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL
} from "./types"


class UserApi {

    login(data) {
        return axiosInstance.post("/auth/jwt/create/", data)
    }
    verify(){
        return axiosInstance.post("/auth/jwt/verify/", {
            "token": localStorage.getItem('access')
        })
    }
    signup(data){
        return axiosInstance.post("/auth/users/", data)
    }
    activateAccount(data){
        return axiosInstance.post("/auth/users/activation/", data)
    }
}

export default new UserApi();


// VERIFY
export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: { 
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ uid, token })
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)
        dispatch({
            type: ACTIVATION_SUCCESS,
        })
    } catch (err) { 
        dispatch({
            type: ACTIVATION_FAIL,
        })
    }
} 

//LOAD USER
export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers: { 
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (err) { 
            dispatch({
                type: USER_LOADED_FAIL,
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        })
    }
};


export const reset_password = (email) => async dispatch => {
    const config = {
        headers: { 
            'Content-type': 'application/json',
        }
    };
    const body = JSON.stringify({ email })
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL 
        })
    }
} 

// 
export const reset_password_confirm = ( uid, token, new_password, re_new_password ) => async dispatch => {
    const config = {
        headers: { 
            'Content-type': 'application/json',
        }
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password })
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}

//LOGOUT
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })  
}