import axios from 'axios'
import { getToken, getRefreshToken, setToken, setRefreshToken, removeTokenAndRefreshToken } from './token'
import { refreshToken as refresh } from '../services/authService'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    const token = getToken()
    const refreshToken = getRefreshToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers['refresh-token'] = refreshToken
    }
    return config
})

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.status === 401) {
        return refresh().then(({ data }) => {
            setToken(data.token)
            setRefreshToken(data.refreshToken)
            const config = error.config
            config.headers.Authorization = `Bearer ${data.token}`
            config.headers['refresh-token'] = data.refreshToken
            return api(config)
        }).catch((err) => {
            removeTokenAndRefreshToken()
            window.location.href = '/login'
            return Promise.reject(err)
        })
    }
    return Promise.reject(error)
})

export default api
