const express = require('express')
const router = express.Router()
const { createMessage, getMessagesByChatRoomId } = require('../controllers/messageController')

router.post('/create', createMessage)
router.get('/:chatRoomId', getMessagesByChatRoomId)

module.exports = router