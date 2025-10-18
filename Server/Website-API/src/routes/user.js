const express = require('express');
const router = express.Router();
const authenticateToken = require('../services/authenticateToken');
const userController = require('../controllers/userController');

router.get('/', authenticateToken, userController.getUserProfile);
router.get('/:username', authenticateToken, userController.getUserByUsername);

module.exports = router;