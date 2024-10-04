import axios from 'axios'
// import { getCookie } from 'cookies-next';
import Cookies from 'js-cookie'

export const axiosInstance = axios.create({
    baseURL: `${process.env.API}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken')
        if (!token) {
            // window.location.href = '/auth/login';
        }
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data.shouldRedirect) {
            window.location.href = response.data.redirectTo
        }
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/auth/login'
        }
        return Promise.reject(error)
    }
)
