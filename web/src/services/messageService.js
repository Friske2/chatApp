const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/'

export const createMessage = async (message) => {
    const response = await fetch(`${BASE_URL}message/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
    return response.json()
}

export const getMessagesByChatRoomId = async (chatRoomId) => {
    if (!chatRoomId) return
    const response = await fetch(`${BASE_URL}message/${chatRoomId}`)
    return response.json()
}