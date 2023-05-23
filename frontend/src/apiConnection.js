import axios from "axios";
import Swal from 'sweetalert2'

const axiosInstance = axios.create({

});

axiosInstance.defaults.baseURL = process.env.REACT_APP_API_URL;


async function refresh_token() {
    let refreshTk = await localStorage.getItem("refreshToken")
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh`, {
        "refresh": refreshTk,
    })
}

axiosInstance.interceptors.response.use((response) => {
    return response
    }, async (error) => {
        const config = error.config;
        if (error.response && error.response.status === 401 && !config._retry) {
            config._retry = true;
            try {
                let refreshing_token = refresh_token();
                let res = await refreshing_token;
                refreshing_token = null;
                if (res.data['access']) {
                    const access_token = res.data['access'];
                    localStorage.setItem('access', access_token);
                    axiosInstance.defaults.headers["Authorization"] = `JWT ${access_token}`
                    config.headers["Authorization"] = `JWT ${access_token}`
                }
                return axiosInstance(config);
            } catch (err) {
                const refresh_token = localStorage.getItem('refreshToken');
                if(refresh_token !== "" && refresh_token !== undefined && refresh_token !== null){
                    Swal.fire({
                        icon: 'error',
                        title: 'La sesion se ha cerrado',
                        footer: '<a href="/login">Inicia sesion nuevamente</a>',
                        allowEscapeKey: false,
                    }).then(function () {
                        localStorage.setItem('access', "");
                        localStorage.setItem('refreshToken', "");
                        window.location = "/login";
                    });
                }
                    return Promise.reject(err)
            }
        }
    return Promise.reject(error)
});

export default axiosInstance 