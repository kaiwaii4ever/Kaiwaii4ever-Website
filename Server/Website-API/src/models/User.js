const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  auth: [String],
  Display_Name: String,
  Email: String,
  Password: String,
  DOB: String,
  Phone_Number: String,
  Pronouns: String,
  Role: String,
  PFP: String,
  Bio: String,
  
  twoFactorSecret: String,
  twoFactorEnabled: { type: Boolean, default: false },
  
  recoveryCode: String,
  recoveryCodeExpires: Date,
  recoveryType: String,
});

module.exports = mongoose.model('users', UserSchema);