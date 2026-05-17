const express = require('express');
const router = express.Router();
const { addCandidate, getCandidates } = require('../controllers/candidateController');

router.route('/')
  .post(addCandidate)
  .get(getCandidates);

module.exports = router;
