const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication

// Route to search user by email
router.get('/search', authMiddleware, conversationController.searchUserByEmail);

// Route to start a conversation
router.post('/start', authMiddleware, conversationController.startConversation);
router.get('/conversations', authMiddleware, conversationController.getUserConversations);

module.exports = router;
