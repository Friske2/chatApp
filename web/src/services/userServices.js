import api from '../utils/api'

export function getUser() {
    return api.get('user')
        .then(response => response.data)
}

export function getUserWithoutUserId(userId) {
    return api.get('user/' + userId + '/without-user-id')
        .then(response => response.data)
        .catch(error => console.log(error))
}

export function createUser(user) {
    return api.post('user', user)
        .then(response => response.data)
}

export function activeUserStatus(userId) {
    return api.patch('user/' + userId + '/active')
        .then(response => response.data)
}

export function getUserByUserId() {
    return api.get('user/me')
        .then(response => response.data)
}