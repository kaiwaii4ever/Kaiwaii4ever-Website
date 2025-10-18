const robloxService = require('../services/robloxService');

exports.getPlayerData = async (req, res) => {
  try {
    const UserID = req.query.UserID || req.query.userID;
    const UniverseID = req.query.UniverseID || req.query.universeID;
    const Username = req.query.Username || req.query.username;

    if (!UserID) return res.status(400).json({ success: false, error: 'UserID is required' });

    const playerData = await robloxService.getPlayerDataFlexible(UserID, UniverseID);

    res.json({
      success: true,
      userId: UserID,
      universeId: UniverseID || 'ALL',
      username: Username || playerData.Name || null,
      data: playerData.Data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};