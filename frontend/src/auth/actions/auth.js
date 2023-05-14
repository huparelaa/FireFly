import axios from 'axios'
import  axiosInstance from '../../src/apiConnection.js'


import {

    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,

    LOGOUT,

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
    resetPassword(data){
        return axiosInstance.post("/auth/users/reset_password/", data)
    }
    retsetPasswordConfirm(data){
        return axiosInstance.post("/auth/users/reset_password_confirm/", data)
    }
}

export default new UserApi();



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

//LOGOUT
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })  
}