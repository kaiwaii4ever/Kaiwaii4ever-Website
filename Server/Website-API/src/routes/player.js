const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.post('/update', playerController.updatePlayer);
router.get('/:playerId', playerController.getPlayer);

module.exports = router;