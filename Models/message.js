const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    content: { type: String, required: true },
    message_type: { type: String, enum: ['text', 'image', 'video', 'file', 'audio'], default: 'text' },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' }
  },
  { collection: 'messages' }
);

module.exports = mongoose.model('Message', messageSchema);
