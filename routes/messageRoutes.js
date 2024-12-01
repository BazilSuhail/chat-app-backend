const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware'); // Authentication middleware

// Route to send a message in a conversation
router.post('/send-message', authMiddleware, conversationController.sendMessage);

// Route to get all messages in a conversation by conversationId
router.get('/:conversationId/messages', authMiddleware, conversationController.getMessages);

module.exports = router;
