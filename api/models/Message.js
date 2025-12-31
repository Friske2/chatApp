const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatRoomId: String,
    senderId: String,
    text: String,
    timestamp: Date
})

module.exports = mongoose.model('Message', messageSchema)