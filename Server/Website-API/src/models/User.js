const mongoose = require('mongoose');
const { hash, verify } = require('@node-rs/argon2');

const UserSchema = new mongoose.Schema({
  auth: [String],
  Display_Name: String,
  Email: String,
  Password: { type: String, select: false },
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

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('Password')) return next();
    if (!this.Password) return next();

    this.Password = await hash(this.Password, { algorithm: 'argon2id' });
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.verifyPassword = async function (candidatePassword) {
  if (!this.Password) return false;
  try {
    return await verify(this.Password, candidatePassword);
  } catch (_) {
    return false;
  }
};

module.exports = mongoose.model('users', UserSchema);