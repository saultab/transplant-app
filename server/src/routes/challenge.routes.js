'use strict';

const express = require('express');
const router = express.Router();
const { challengeRepository } = require('../db/challenge.repository');
const { validate, validators } = require('../middleware/validation');

// GET /api/challenge - Get all challenges
router.get('/', (req, res, next) => {
  try {
    const challenges = challengeRepository.getAll();
    res.json(challenges);
  } catch (err) {
    next(err);
  }
});

// GET /api/challenge/users - Get challenges by user
router.get('/users', (req, res, next) => {
  try {
    const challenges = challengeRepository.getByUser();
    res.json(challenges);
  } catch (err) {
    next(err);
  }
});

// POST /api/challenge - Add a challenge to a user
router.post('/', validators.addChallenge, validate, (req, res, next) => {
  try {
    const id = challengeRepository.addToUser(req.body.challenge, req.body.user);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/challenge/:userID/:challengeID - Remove a challenge from a user
router.delete('/:userID/:challengeID', validators.deleteChallenge, validate, (req, res, next) => {
  try {
    challengeRepository.removeFromUser(req.params.userID, req.params.challengeID);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// PUT /api/challenge - Mark challenge as completed
router.put('/', validators.updateChallenge, validate, (req, res, next) => {
  try {
    // Note: In the original code, superUser was hardcoded to 1.
    // This should eventually use authenticated user ID.
    const userID = req.body.user || 1;
    challengeRepository.markCompleted(req.body.challenge, userID);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
