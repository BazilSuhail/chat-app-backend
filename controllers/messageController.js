const Message = require('../models/message');
const Conversation = require('../models/conversation');

// Controller to send a message
exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, content, messageType } = req.body;
    const senderId = req.user.id; // The sender's user ID

    // Create the new message
    const newMessage = new Message({
      conversation_id: conversationId,
      sender_id: senderId,
      content,
      message_type: messageType || 'text', // Default to 'text' if no messageType is provided
      status: 'sent',
    });

    // Save the new message to the database
    await newMessage.save();

    // Find the conversation and update the messages array
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Add the new message ID to the conversation's messages array
    conversation.messages.push(newMessage._id);

    // Save the updated conversation
    await conversation.save();

    res.status(201).json({ message: 'Message sent successfully', messageId: newMessage._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params; // Get the conversationId from URL params

    // Find the conversation by ID and select only the 'participants' and 'messages' fields
    const conversation = await Conversation.findById(conversationId).select('messages');
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // If `messages` is undefined or empty, respond with an appropriate message
    if (!Array.isArray(conversation.messages) || conversation.messages.length === 0) {
      return res.status(200).json({ messages: [], message: 'No messages in this conversation' });
    }

    // Fetch each message by ID using findById and collect them in an array
    const messagePromises = conversation.messages.map(async (messageId) => {
      return await Message.findById(messageId); // Fetch message by ID
    });

    // Wait for all messages to be fetched
    const messages = await Promise.all(messagePromises);

    // Send all the messages
    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
