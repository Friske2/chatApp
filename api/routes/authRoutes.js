const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/revoke', authController.revokeToken);
router.post('/refresh', authController.refreshToken);
router.post('/verify', authController.verifyToken);

module.exports = router;