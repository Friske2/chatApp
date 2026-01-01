import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/'


export function getUser() {
    return axios.get(BASE_URL + 'user')
        .then(response => response.data)
}

export function getUserWithoutUserId(userId) {
    return axios.get(BASE_URL + 'user/' + userId + '/without-user-id')
        .then(response => response.data)
        .catch(error => console.log(error))
}

export function createUser(user) {
    return axios.post(BASE_URL + 'user', user)
        .then(response => response.data)
}

export function activeUserStatus(userId) {
    return axios.patch(BASE_URL + 'user/' + userId + '/active')
        .then(response => response.data)
}

export async function userLogin(user) {
    const response = await axios.post(BASE_URL + 'user/login', user)
    return response.data
}

export function userLogout(userId) {
    return axios.post(BASE_URL + 'user/logout', { userId })
        .then(response => response.data)
}