const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  auth: [String],
  Display_Name: String,
  Email: String,
  DOB: String,
  Phone_Number: String,
  Pronouns: String,
  Role: String,
  PFP: String,
  Bio: String,
});

module.exports = mongoose.model('users', UserSchema);
