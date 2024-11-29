const Conversation = require('../models/conversation');

exports.createConversation = async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    const existingConversation = await Conversation.findOne({
      participants: { $all: [user1, user2] }
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const newConversation = new Conversation({ participants: [user1, user2] });
    await newConversation.save();

    res.status(201).json(newConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({ participants: userId }).populate('participants', 'username');
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
