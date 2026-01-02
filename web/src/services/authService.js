import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/'

export async function login(payload) {
    try {
        const response = await axios.post(`${BASE_URL}auth/login`, payload)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export function logout() {
    const token = sessionStorage.getItem('token')
    const refreshToken = sessionStorage.getItem('refreshToken')
    const response = axios.post(`${BASE_URL}auth/logout`, {

    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'refresh-token': refreshToken,
        }
    })
    return response.data
}

export function revokeToken() {
    const token = sessionStorage.getItem('token')
    const refreshToken = sessionStorage.getItem('refreshToken')
    const response = axios.post(`${BASE_URL}auth/revoke-token`, {

    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'refresh-token': refreshToken,
        }
    })
    return response.data
}

export function verifyToken() {
    const token = sessionStorage.getItem('token')
    const response = axios.post(`${BASE_URL}auth/verify-token`, {

    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data
}

export function refreshToken() {
    const token = sessionStorage.getItem('token')
    const refreshToken = sessionStorage.getItem('refreshToken')
    return axios.post(`${BASE_URL}auth/refresh`, {

    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'refresh-token': refreshToken,
        }
    })
}