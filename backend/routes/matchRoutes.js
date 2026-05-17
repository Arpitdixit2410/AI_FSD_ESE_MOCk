const express = require('express');
const router = express.Router();
const { matchCandidates } = require('../controllers/candidateController');

router.post('/', matchCandidates);

module.exports = router;
