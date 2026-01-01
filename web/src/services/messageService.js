import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/'


export const createMessage = async (message) => {
    const response = await axios.post(`${BASE_URL}message/create`, message)
    return response.data
}

export const getMessagesByChatRoomId = async (chatRoomId) => {
    if (!chatRoomId) return
    const response = await axios.get(`${BASE_URL}message/${chatRoomId}`)
    return response.data
}