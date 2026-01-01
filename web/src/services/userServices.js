const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/'


export function getUser() {
    return fetch(BASE_URL + 'user')
        .then(response => response.json())
}

export function getUserWithoutUserId(userId) {
    return fetch(BASE_URL + 'user/' + userId + '/without-user-id', {
        method: 'GET',
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export function createUser(user) {
    return fetch(BASE_URL + 'user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => response.json())
}

export function activeUserStatus(userId) {
    return fetch(BASE_URL + 'user/' + userId + '/active', {
        method: 'PATCH',
    })
        .then(response => response.json())
}

export async function userLogin(user) {
    const response = await fetch(BASE_URL + 'user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })

    const data = await response.json()

    if (!response.ok) {
        // Create error object with response data to match typical usage
        console.log(data)
        const error = new Error(data.error || 'login failed')
        error.response = { data }
        console.log(error)
        throw error
    }

    return data
}

export function userLogout(userId) {
    return fetch(BASE_URL + 'user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    })
        .then(response => response.json())
}