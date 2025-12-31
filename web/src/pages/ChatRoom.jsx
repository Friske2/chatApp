import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import MessageInput from '../components/MessageInput'
import { getChatRoomId, getUserId } from '../utils/chatUtils'
import { useMessages } from '../hooks/useMessage'
function Chat() {
    const { id } = useParams()
    const messagesEndRef = useRef(null)
    const [chatRoomId, setChatRoomId] = useState(null)
    const { messages, loading, sendMessage } = useMessages(chatRoomId)
    useEffect(() => {
        setChatRoomId(getChatRoomId(id, getUserId()))
    }, [id])
    const handleSendMessage = useCallback((message) => {
        // scroll to bottom
        sendMessage(message)
    }, [sendMessage])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    if (!chatRoomId) {
        return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>
    }
    if (loading) {
        return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div className="p-4 bg-base-200 rounded-box mt-4 flex flex-col h-[calc(100vh-150px)]">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-base-300">Chat Room {id}</h2>

            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat ${msg.sender === 'me' ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <div className={`chat-bubble ${msg.sender === 'me' ? 'chat-bubble-secondary' : 'chat-bubble-primary'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-base-300 pt-4">
                <MessageInput onSendMessage={handleSendMessage} />
                <div className='mt-4 flex justify-center'>
                    <Link to="/" className="btn btn-outline btn-sm">Back Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Chat