const express = require('express');
const router = express.Router();
const authenticateToken = require('../services/authenticateToken');
const userController = require('../controllers/userController');
const securityController = require('../controllers/securityController');

router.get('/', authenticateToken, userController.getUserProfile);
router.get('/:username', authenticateToken, userController.getUserByUsername);

// Update routes
router.put('/update', authenticateToken, userController.updateProfile);
router.put('/username', authenticateToken, userController.updateUsername);
router.put('/email', authenticateToken, userController.updateEmail);
router.put('/phone', authenticateToken, userController.updatePhone);
router.put('/password', authenticateToken, userController.updatePassword);

// 2FA routes
router.post('/2fa/enable', authenticateToken, securityController.enable2FA);
router.post('/2fa/verify', authenticateToken, securityController.verify2FA);
router.post('/2fa/disable', authenticateToken, securityController.disable2FA);

// Recovery routes
router.post('/forgot/:type', authenticateToken, securityController.forgotCredential);
router.post('/verify-recovery', authenticateToken, securityController.verifyRecovery);

module.exports = router;