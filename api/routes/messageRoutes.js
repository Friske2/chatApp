const express = require('express')
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router()
const { createMessage, getMessagesByChatRoomId } = require('../controllers/messageController')

router.post('/create', authMiddleware, createMessage)
router.get('/:chatRoomId', authMiddleware, getMessagesByChatRoomId)

module.exports = router