const mongoose = require('mongoose');

const userContactSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Same _id as in the users collection 
    //conversations: { type: [String], default: [] } // Array of conversation IDs
    conversations: {
      type: [
        {
          conversationId: String,
          participantId: String,
        },
      ],
      default: [],
    },
  },
  { collection: 'userContacts', timestamps: true }
);

module.exports = mongoose.model('UserContact', userContactSchema);
