const express = require('express'); 
const messageController = require('../controllers/messageController');

const router = express.Router(); 
 
router.post('/messages', messageController.sendMessage);
router.get('/messages/:conversation_id', messageController.getConversationMessages);

module.exports = router;
