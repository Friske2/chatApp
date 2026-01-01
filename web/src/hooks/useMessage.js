import { useState, useEffect } from 'react'
import { getUserId } from '../utils/chatUtils'
import { socket } from './useSocket'
import { getMessagesByChatRoomId, createMessage } from '../services/messageService'

export function useMessages(chatId) {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    // 1. Initial Load
    useEffect(() => {
        if (!chatId) return
        const fetchMessages = async () => {
            setLoading(true)
            try {
                const messages = await getMessagesByChatRoomId(chatId)
                const filteredMessages = messages.map(message => ({
                    ...message,
                    sender: message.senderId == getUserId() ? 'me' : 'them'
                }))
                console.log(filteredMessages)
                setMessages(filteredMessages)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMessages()
    }, [chatId])

    // 2. Socket Connection & Listeners
    useEffect(() => {
        if (!chatId) return

        // Connect and Join Room
        if (!socket.connected) {
            socket.connect()
        }
        socket.emit('join_room', chatId)
        console.log(`Joined room: ${chatId}`)

        // Listen for incoming messages
        const handleReceiveMessage = (newMessage) => {
            console.log('Received:', newMessage)
            setMessages(prev => [...prev, {
                ...newMessage,
                sender: 'them'
            }])
        }

        socket.on('receive_message', handleReceiveMessage)

        return () => {
            socket.off('receive_message', handleReceiveMessage)
        }
    }, [chatId])

    const sendMessage = (text) => {
        const newMessage = {
            id: Date.now(),
            text,
            sender: 'me',
            senderId: getUserId(),
            roomId: chatId,
            chatRoomId: chatId
        }

        // 1. Optimistic UI update
        setMessages(prev => [...prev, newMessage])

        // 2. Send to Server
        createMessage(newMessage)
        socket.emit('send_message', newMessage)
    }

    return { messages, loading, sendMessage }
}
