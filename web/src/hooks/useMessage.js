import { useState, useEffect } from 'react'
import { getUserId } from '../utils/chatUtils'
import { socket } from './useSocket'
import { getMessagesByChatRoomId, createMessage } from '../services/messageService'

export function useMessages(chatId) {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    // Initial Load & Socket Listeners
    useEffect(() => {
        if (!chatId) return
        setLoading(true)

        // Connect and Join Room
        if (!socket.connected) {
            socket.connect()
        }
        socket.emit('join_room', chatId)
        console.log(`Joined room: ${chatId}`)

        // Mock Initial Data (In real app, fetch from API here)
        // For now, we start empty or could keep mock data if preferred
        getMessagesByChatRoomId(chatId).then(messages => {
            const filteredMessages = messages.map(message => ({
                ...message,
                sender: message.senderId == getUserId() ? 'me' : 'them'
            }))
            console.log(filteredMessages)
            setMessages(filteredMessages)
            setLoading(false)
        })

        // Listen for incoming messages
        const handleReceiveMessage = (newMessage) => {
            console.log('Received:', newMessage)
            // Determine if the message is from 'me' or 'them' based on current logic (simplified)
            // Ideally, check newMessage.senderId vs currentUserId
            setMessages(prev => [...prev, {
                ...newMessage,
                // If the message came from socket broadcast (from server), it's from 'them' (unless we check ID)
                // However, our sendMessage optimistically adds 'me', so socket broadcast should generally be others.
                // Assuming server broadcasts to others only (socket.to(room).emit), this is fine.
                // But if server emits to ALL, we need to dedup. 
                // Our server uses socket.to(room), so sender doesn't receive it back.
                sender: 'them'
            }])
        }

        socket.on('receive_message', handleReceiveMessage)

        return () => {
            socket.off('receive_message', handleReceiveMessage)
            // Optional: Leave room logic if needed
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
