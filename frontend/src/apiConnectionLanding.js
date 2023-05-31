import axios from "axios";
import Swal from 'sweetalert2'

const axiosInstance = axios.create({

});

axiosInstance.defaults.baseURL = process.env.REACT_APP_API_URL;


async function refresh_token() {
    let refreshTk = localStorage.getItem("refreshToken")
    return await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh`, {
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
                let refreshValue = localStorage.getItem("refreshToken")
                if(refreshValue==="" ||refreshValue === undefined||refreshValue===null)
                {
                    return Promise.reject()
                }
                let res = await refresh_token();
                if (res.data['access']) {
                    const access_token = res.data['access'];
                    localStorage.setItem('access', res.data['access']);
                    config.headers["Authorization"] = `JWT ${access_token}`
                }else if(res.response.status === 401){
                    Swal.fire({
                        icon: 'error',
                        title: 'La sesión se ha cerrado',
                        footer: '<a href="/login">Inicia sesion nuevamente</a>',
                        allowEscapeKey: false,
                    }).then(function () {
                        localStorage.setItem('access', "");
                        localStorage.setItem('refreshToken', "");
                        window.location = "/login";
                    });
                }
                return axiosInstance(config);
            } catch (err) {
                return Promise.reject(err)
            }
        }
    return Promise.reject(error)
});

export default axiosInstance 