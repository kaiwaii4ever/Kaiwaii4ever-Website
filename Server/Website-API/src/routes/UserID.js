const express = require('express');
const router = express.Router();
const PlayerModel = require('../models/Player');

router.post('/', async (req, res) => {
  const { userId, username, Banned } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'Missing userId' });
  }

  try {
    const exists = await PlayerModel.findOne({ userId });
    if (exists) {
      return res.json({ success: true, message: 'Already exists' });
    }

    await PlayerModel.create({
      userId,
      username: username || "Unknown",
      Banned: !!Banned,
      joinedAt: new Date(),
    });

    res.json({ success: true, message: 'Player added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const players = await PlayerModel.find(
      {},
      { _id: 0, userId: 1, username: 1, Banned: 1, joinedAt: 1 }
    ).sort({ joinedAt: -1 });

    res.json({ success: true, players });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;