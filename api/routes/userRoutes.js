const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', authMiddleware, userController.getUsers);
router.get('/me', authMiddleware, userController.getUserByUserId)
router.patch('/active', authMiddleware, userController.activeUserStatus);

module.exports = router;
