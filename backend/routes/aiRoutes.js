const express = require('express');
const router = express.Router();
const { shortlistAI } = require('../controllers/aiController');

router.post('/shortlist', shortlistAI);

module.exports = router;
