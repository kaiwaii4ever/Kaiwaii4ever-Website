const { sendEmail } = require('../services/emailService');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const crypto = require('crypto');
const User = require('../models/User');

// Enable 2FA
exports.enable2FA = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const secret = speakeasy.generateSecret({
      name: `Kaiwaii4ever (${req.user.email})`,
      length: 32
    });

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    res.json({
      success: true,
      secret: secret.base32,
      qrCode: qrCode
    });
  } catch (error) {
    console.error('Error enabling 2FA:', error);
    res.status(500).json({ success: false, message: 'Failed to generate 2FA' });
  }
};

// Verify and activate 2FA
exports.verify2FA = async (req, res) => {
  try {
    const { token, secret } = req.body;
    const userId = req.user._id;

    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2
    });

    if (!verified) {
      return res.status(400).json({ success: false, message: 'Invalid code' });
    }

    await User.findByIdAndUpdate(userId, {
      $set: {
        twoFactorSecret: secret,
        twoFactorEnabled: true
      }
    });

    res.json({ success: true, message: '2FA enabled successfully' });
  } catch (error) {
    console.error('Error verifying 2FA:', error);
    res.status(500).json({ success: false, message: 'Failed to verify 2FA' });
  }
};

// Disable 2FA
exports.disable2FA = async (req, res) => {
  try {
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, {
      $set: {
        twoFactorSecret: null,
        twoFactorEnabled: false
      }
    });

    res.json({ success: true, message: '2FA disabled successfully' });
  } catch (error) {
    console.error('Error disabling 2FA:', error);
    res.status(500).json({ success: false, message: 'Failed to disable 2FA' });
  }
};

// Forgot Email/Password - Send Recovery
exports.forgotCredential = async (req, res) => {
  try {
    const { method, email } = req.body;
    const { type } = req.params;
    const userId = req.user._id;

    if (method === 'discord') {
      console.log(`Recovery request for user ${userId} - Type: ${type}`);
      
      return res.json({
        success: true,
        message: 'Recovery request sent to Discord support team'
      });
    }

    if (method === 'email') {
      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Valid email required' });
      }

      const code = crypto.randomInt(100000, 999999).toString();
      
      await User.findByIdAndUpdate(userId, {
        $set: {
          recoveryCode: code,
          recoveryCodeExpires: new Date(Date.now() + 10 * 60 * 1000),
          recoveryType: type
        }
      });

      const emailResult = await sendEmail({
        to: email,
        subject: `Your ${type} Recovery Code - Kaiwaii4ever`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                .code-box { background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px solid #2563eb; }
                .code { font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 4px; }
                .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Account Recovery</h1>
                </div>
                <div class="content">
                  <p>Hello,</p>
                  <p>You requested to recover your <strong>${type}</strong>. Use the verification code below to complete the process:</p>
                  
                  <div class="code-box">
                    <div class="code">${code}</div>
                  </div>
                  
                  <p><strong>This code will expire in 10 minutes.</strong></p>
                  <p>If you didn't request this, please ignore this email and ensure your account is secure.</p>
                </div>
                <div class="footer">
                  <p>© 2025 Kaiwaii4ever. All rights reserved.</p>
                  <p>This is an automated message, please do not reply.</p>
                </div>
              </div>
            </body>
          </html>
        `
      });

      if (!emailResult.success) {
        return res.status(500).json({ success: false, message: 'Failed to send email' });
      }

      return res.json({
        success: true,
        message: 'Verification code sent to email'
      });
    }

    res.status(400).json({ success: false, message: 'Invalid recovery method' });
  } catch (error) {
    console.error('Error sending recovery:', error);
    res.status(500).json({ success: false, message: 'Failed to send recovery' });
  }
};

exports.verifyRecovery = async (req, res) => {
  try {
    const { code, type } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    
    if (!user.recoveryCode || !user.recoveryCodeExpires) {
      return res.status(400).json({ success: false, message: 'No recovery code found' });
    }

    if (new Date() > user.recoveryCodeExpires) {
      return res.status(400).json({ success: false, message: 'Recovery code expired' });
    }

    if (user.recoveryCode !== code) {
      return res.status(400).json({ success: false, message: 'Invalid code' });
    }

    const info = type === 'email' ? user.Email : 'Password reset information';
    
    const emailResult = await sendEmail({
      to: user.Email,
      subject: `Your ${type} Information - Kaiwaii4ever`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✓ Verification Successful</h1>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>You've successfully verified your identity. Here's your ${type} information:</p>
                
                <div class="info-box">
                  <p><strong>${type === 'email' ? 'Your Email' : 'Password Reset'}:</strong></p>
                  <p style="font-size: 18px; color: #2563eb;">${info}</p>
                </div>
                
                ${type === 'password' ? '<p>To reset your password, please contact support or use the password reset link in your account settings.</p>' : ''}
                
                <p>If you didn't request this information, please contact support immediately.</p>
              </div>
              <div class="footer">
                <p>© 2025 Kaiwaii4ever. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (!emailResult.success) {
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }

    await User.findByIdAndUpdate(userId, {
      $unset: { recoveryCode: '', recoveryCodeExpires: '', recoveryType: '' }
    });

    res.json({ success: true, message: `${type} sent to your email` });
  } catch (error) {
    console.error('Error verifying recovery:', error);
    res.status(500).json({ success: false, message: 'Failed to verify code' });
  }
};

module.exports = exports;