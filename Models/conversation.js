const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // Array of Message IDs
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { collection: 'conversations' }
);

module.exports = mongoose.model('Conversation', conversationSchema);
