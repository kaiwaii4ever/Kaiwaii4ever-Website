const express = require('express');
const router = express.Router();

const SECRET_KEY = process.env.PYK_SMP;

let stopSignal = false;

router.post('/stop', (req, res) => {
    const { key } = req.body;
    if (key !== SECRET_KEY) return res.status(403).json({ message: 'Forbidden: Invalid key' });
    
    stopSignal = true;
    res.json({ message: 'Stop signal set' });
});

router.get('/check', (req, res) => {
    res.json({ stop: stopSignal });
});

router.post('/reset', (req, res) => {
    stopSignal = false;
    res.json({ message: 'Stop signal reset' });
});

module.exports = router;