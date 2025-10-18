const fetch = require('node-fetch');

exports.checkBanStatus = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

  try {
    const response = await fetch(`https://users.roblox.com/v1/users/${userId}/status`);
    if (!response.ok) return res.status(response.status).json({ success: false, message: 'Roblox API error' });

    const data = await response.json();
    res.json({ success: true, Banned: data.isBanned || false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};