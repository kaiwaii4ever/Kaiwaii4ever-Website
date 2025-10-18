const robloxService = require('../services/robloxService');
const PlayerModel = require('../models/Player');

exports.updatePlayer = async (req, res) => {
  const { playerId, value } = req.body;
  try {
    const result = await robloxService.updatePlayerInAllUniverses(playerId, value);
    const player = await PlayerModel.findOne({ userId: playerId });
    const username = player?.username || null;
    res.json({ success: true, data: result, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getPlayer = async (req, res) => {
  const { playerId } = req.params;
  try {
    const result = await robloxService.getPlayerDataFromAllUniverses(playerId);
    const player = await PlayerModel.findOne({ userId: playerId });
    const username = player?.username || null;
    res.json({ success: true, data: result, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllUserIds = async (req, res) => {
  try {
    const players = await PlayerModel.find({}, { _id: 0, userId: 1 }).lean();
    const userIds = players.map(p => p.userId);
    res.json({ success: true, userIds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};