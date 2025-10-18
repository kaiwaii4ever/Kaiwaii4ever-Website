const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const usernameQuery = req.query.username;
    let userProfile;

    if (usernameQuery) {
      const user = await User.findOne({ "auth.0": usernameQuery }).lean();
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      userProfile = {
        displayName: user.Display_Name || "Unknown",
        email: user.Email || "N/A",
        username: user.auth[0] || "N/A",
        pronouns: user.Pronouns || "",
        DOB: user.DOB || "",
        phone: user.Phone_Number || "N/A",
        PFP: user.PFP || "https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg",
        role: user.Role || "User",
        bio: user.Bio || "No bio available",
      };
    } else {
      const u = req.user;
      userProfile = {
        displayName: u.displayName || "Unknown",
        email: u.email || "N/A",
        username: u.username || "N/A",
        pronouns: u.pronouns || "",
        DOB: u.DOB || "",
        phone: u.phone || "N/A",
        PFP: u.PFP || "https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg",
        role: u.role || "User",
        bio: u.bio || "No bio available",
      };
    }

    res.json({
      success: true,
      user: userProfile,
      stats: {
        activePlayers: 20, // temp
        totalVisits: 1500, // temp
        totalRevenue: 3000 // temp
      }
    });
  } catch (err) {
    console.error("Userdata error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ "auth.0": username }).lean();
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const userProfile = {
      displayName: user.Display_Name || "Unknown",
      email: user.Email || "N/A",
      username: user.auth ? user.auth[0] : "N/A",
      pronouns: user.Pronouns || "",
      DOB: user.DOB || "",
      phone: user.Phone_Number || "N/A",
      PFP: user.PFP || "https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg",
      role: user.Role || "User",
      bio: user.Bio || "No bio available",
    };

    res.json({ success: true, user: userProfile });
  } catch (err) {
    console.error("Userdata by username error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};