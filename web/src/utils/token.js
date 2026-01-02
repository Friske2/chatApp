export function setToken(token) {
    sessionStorage.setItem('token', token)
}

export function setRefreshToken(token) {
    sessionStorage.setItem('refreshToken', token)
}

export function getToken() {
    return sessionStorage.getItem('token')
}

export function getRefreshToken() {
    return sessionStorage.getItem('refreshToken')
}

export function removeTokenAndRefreshToken() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('refreshToken')
}