const Message = require('../models/Message')

exports.createMessage = (req, res) => {
    const { chatRoomId, senderId, text } = req.body
    const timestamp = new Date().getTime()
    const message = new Message({ chatRoomId, senderId, text, timestamp })
    message.save()
        .then(() => res.status(201).json({ message: 'Message created successfully' }))
        .catch((error) => res.status(500).json({ error: error.message }))
}

exports.getMessagesByChatRoomId = (req, res) => {
    const { chatRoomId } = req.params
    Message.find({ chatRoomId })
        .sort({ timestamp: 1 })
        .then((messages) => res.status(200).json(messages))
        .catch((error) => res.status(500).json({ error: error.message }))
}