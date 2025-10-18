const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../services/authenticateToken');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ 'auth.0': username });
    if (!user || user.auth[1] !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = {
      userId: user._id,
      username: user.auth[0],
      displayName: user.Display_Name,
      email: user.Email,
      role: user.Role,
      PFP: user.PFP
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '720h' });

    res.json({ success: true, user: payload, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/refresh-token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(400).json({ message: 'Token not expired yet' });
  } catch (err) {
    if (err.name !== 'TokenExpiredError') throw err;
    payload = jwt.decode(token);
  }

  const user = await User.findById(payload.userId);
  if (!user) return res.status(403).json({ message: 'User not found' });

  const newToken = jwt.sign({
    userId: user._id,
    username: user.auth[0],
    displayName: user.Display_Name,
    email: user.Email,
    role: user.Role,
    PFP: user.PFP
  }, process.env.JWT_SECRET, { expiresIn: '720h' });

  res.json({ token: newToken });
});

router.get('/me', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;