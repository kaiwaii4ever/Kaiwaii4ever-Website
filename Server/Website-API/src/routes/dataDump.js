const express = require('express');
const router = express.Router();
const robloxService = require('../services/robloxService');

router.get('/', async (req, res) => {
  try {
    const UserID = req.query.UserID || req.query.userID;
    const UniverseID = req.query.UniverseID || req.query.universeID;

    if (!UserID) return res.status(400).json({ success: false, error: 'UserID is required' });

    const playerData = await robloxService.getPlayerDataFlexible(UserID, UniverseID);

    res.json({
      success: true,
      userId: UserID,
      universeId: UniverseID || 'ALL',
      username: playerData.Name || null,
      data: playerData.Data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;