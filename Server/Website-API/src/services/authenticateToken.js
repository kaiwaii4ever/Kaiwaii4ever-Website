const jwt = require("jsonwebtoken");
const User = require('../models/User');

module.exports = async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) return res.sendStatus(403);

    req.user = {
      _id: user._id,
      displayName: user.Display_Name,
      role: user.Role,
      email: user.Email,
      PFP: user.PFP,
      username: user.auth?.[0] || "",
      pronouns: user.Pronouns || "",
      DOB: user.DOB || "",
      phone: user.Phone_Number || "",
      bio: user.Bio || "",
    };

    next();
  } catch (err) {
    console.error("Token auth error:", err);
    res.sendStatus(403);
  }
};