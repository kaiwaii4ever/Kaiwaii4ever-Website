const User = require('../models/User');
const bcrypt = require('bcrypt');

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
        activePlayers: 20,
        totalVisits: 1500,
        totalRevenue: 3000
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

exports.updateProfile = async (req, res) => {
  try {
    const { displayName, pronouns, DOB } = req.body;
    const userId = req.user._id;

    const updateData = {};
    if (displayName !== undefined) updateData.Display_Name = displayName;
    if (pronouns !== undefined) updateData.Pronouns = pronouns;
    if (DOB !== undefined) updateData.DOB = DOB;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      user: {
        displayName: user.Display_Name,
        email: user.Email,
        username: user.auth ? user.auth[0] : 'N/A',
        pronouns: user.Pronouns,
        DOB: user.DOB,
        phone: user.Phone_Number,
        PFP: user.PFP,
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user._id;

    if (!username || username.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Username cannot be empty' });
    }

    const existingUser = await User.findOne({ "auth.0": username.trim() });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      return res.status(409).json({ success: false, message: 'Username already taken' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { "auth.0": username.trim() } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ 
      success: true, 
      message: 'Username updated successfully',
      user: {
        username: user.auth[0]
      }
    });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ success: false, message: 'Failed to update username' });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    
    const userId = req.user._id;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password verification required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.Password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const existingUser = await User.findOne({ Email: email.toLowerCase() });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { Email: email.toLowerCase() } },
      { new: true, runValidators: true }
    );

    res.json({ 
      success: true, 
      message: 'Email updated successfully',
      user: {
        email: updatedUser.Email
      }
    });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ success: false, message: 'Failed to update email' });
  }
};

exports.updatePhone = async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    
    const userId = req.user._id;

    if (!phone || phone.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Phone number cannot be empty' });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password verification required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.Password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { Phone_Number: phone.trim() } },
      { new: true, runValidators: true }
    );

    res.json({ 
      success: true, 
      message: 'Phone number updated successfully',
      user: {
        phone: updatedUser.Phone_Number
      }
    });
  } catch (error) {
    console.error('Error updating phone:', error);
    res.status(500).json({ success: false, message: 'Failed to update phone number' });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'All password fields are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if user has a password field
    if (!user.Password) {
      return res.status(400).json({ success: false, message: 'Password not set for this account' });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.Password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await User.findByIdAndUpdate(userId, { $set: { Password: hashedPassword } });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ success: false, message: 'Failed to update password' });
  }
};

module.exports = exports;