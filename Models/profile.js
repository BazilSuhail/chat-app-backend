const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String, default: null },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    last_seen: { type: Date, default: null }
  },
  { collection: 'profiles', timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
