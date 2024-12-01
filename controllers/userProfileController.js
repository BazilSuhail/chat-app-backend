
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userProfile');
 

exports.getUser = async (req, res) => {
    try {
      const userId = req.user.id; // Assume the user ID is available in `req.user` after authentication
      const user = await User.findById(userId, 'name email'); // Fetch username and email
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };