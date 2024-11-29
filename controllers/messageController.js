const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
  try {
    const { conversation_id, sender_id, receiver_id, content, message_type } = req.body;

    const newMessage = new Message({
      conversation_id,
      sender_id,
      receiver_id,
      content,
      message_type
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getConversationMessages = async (req, res) => {
  try {
    const { conversation_id } = req.params;

    const messages = await Message.find({ conversation_id }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
