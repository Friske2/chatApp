import { useState } from 'react'

function MessageInput({ onSendMessage }) {
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim()) {
            onSendMessage(message)
            setMessage('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
                Send
            </button>
        </form>
    )
}

export default MessageInput
