const User = require('../models/User');

exports.findByUsername = async (username) => {
  return User.findOne({ "auth.0": username }).lean();
};

exports.findById = async (id) => {
  return User.findById(id);
};