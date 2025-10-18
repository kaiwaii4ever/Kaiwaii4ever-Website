const express = require('express');
const router = express.Router();
const banController = require('../controllers/banController');

router.get('/:userId', banController.checkBanStatus);

module.exports = router;