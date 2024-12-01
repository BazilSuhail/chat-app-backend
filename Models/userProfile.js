const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // Added index property
    password: { type: String, required: true },
    profile_picture: { type: String, default: null },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    last_seen: { type: Date, default: null }
  },
  { collection: 'userProfile', timestamps: true }
);
UserProfileSchema.index({ email: 1 }); // Manually defining an ascending index

module.exports = mongoose.model('userProfile', UserProfileSchema);
