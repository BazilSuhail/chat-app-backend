const express = require('express'); 
const conversationController = require('../controllers/conversationController'); 

const router = express.Router();
 

// Conversation routes
router.post('/conversations', conversationController.createConversation);
router.get('/conversations/:userId', conversationController.getUserConversations);
 
module.exports = router;
