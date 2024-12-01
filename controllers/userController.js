const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userProfile');
const UserContact = require('../models/userContacts');


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user document
    await newUser.save();

    // Create a corresponding userContact document with the same _id as the user
    const newUserContact = new UserContact({
      _id: newUser._id, // Use the same _id as the user
      sendRequests: [],
      receivedRequests: [],
      conversations: []
    });

    // Save the userContact document
    await newUserContact.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.json({ token, user: { id: user._id, name: user.name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
