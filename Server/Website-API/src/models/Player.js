const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, default: "Unknown" },
  Banned: { type: Boolean, default: false },
  joinedAt: { type: Date, default: Date.now },
}, { collection: 'userIDs' });

module.exports = mongoose.model('Player', PlayerSchema);
