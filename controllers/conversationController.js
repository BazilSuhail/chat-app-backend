const Profile = require('../models/userProfile'); 
const Conversation = require('../models/conversation'); 
const UserContact = require('../models/userContacts'); 

// Search for a user by email
exports.searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    //console.log(email)

    // Find the user by email
    const user = await Profile.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ email: user.email, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a user to start a conversation
exports.startConversation = async (req, res) => {
  try {
    const userId = req.user.id; // Logged-in user's ID from the request
    const { email } = req.body; // Email of the user to start a conversation with

    // Find the recipient user by email
    const recipient = await Profile.findOne({ email });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Check if a conversation already exists between the two users
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, recipient._id] },
    });

    // If no conversation exists, create one
    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, recipient._id],
      });
      await conversation.save();

      /*await UserContact.updateOne(
        { _id: userId },
        { $push: { conversations: conversation._id } }
      );
      await UserContact.updateOne(
        { _id: recipient._id },
        { $push: { conversations: conversation._id } }
      );*/
      await UserContact.updateOne(
        { _id: userId },
        {
          $push: {
            conversations: {
              conversationId: conversation._id,
              participantId: recipient._id
            },
          },
        }
      );

      await UserContact.updateOne(
        { _id: recipient._id },
        {
          $push: {
            conversations: {
              conversationId: conversation._id,
              participantId: userId
            },
          },
        }
      );
    }

    res.status(201).json({ message: 'Conversation started', conversationId: conversation._id });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all conversations of a user


exports.getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const userContact = await UserContact.findById(userId);

    if (!userContact) {
      return res.status(404).json({ error: 'User contact data not found' });
    }

    const conversations = userContact.conversations;
    const conversationDetails = await Promise.all(
      conversations.map(async (conversation) => {
        const participantProfile = await Profile.findById(conversation.participantId).select('name profile_picture updatedAt status');
        return {
          conversationId: conversation.conversationId,
          participant: participantProfile || null,
        };
      })
    );
    //console.log(conversationDetails)
    res.status(200).json({ conversations: conversationDetails });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

/*exports.getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;  
    const userContact = await UserContact.findById(userId);

    if (!userContact) {
      return res.status(404).json({ error: 'User contact data not found' });
    } 
    const conversationIds = userContact.conversations; 
 
    res.status(200).json({ conversations: conversationIds });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
*/