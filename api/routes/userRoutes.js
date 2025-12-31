const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.post('/login', userController.userLogin);
router.post('/logout', userController.userLogout);
router.patch('/active', userController.activeUserStatus);

module.exports = router;
