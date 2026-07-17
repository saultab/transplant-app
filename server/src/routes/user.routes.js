'use strict';

const express = require('express');
const router = express.Router();
const { userRepository } = require('../db/user.repository');
const { validate, validators } = require('../middleware/validation');

// GET /api/users/me - Get current user info
router.get('/me', (req, res, next) => {
  try {
    const info = userRepository.getMyInfo();
    res.json(info);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/me - Update current user info
router.put('/me', validators.updateMyInfo, validate, (req, res, next) => {
  try {
    userRepository.updateMyInfo(req.body.myInfo);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/users - Get all users info
router.get('/', (req, res, next) => {
  try {
    const users = userRepository.getAllInfoUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/state - Update user friendship state
router.put('/state', validators.updateInfoUser, validate, (req, res, next) => {
  try {
    userRepository.updateRequestState(req.body.userID, req.body.request_state);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/users/filters - Get user filters
router.get('/filters', (req, res, next) => {
  try {
    const filters = userRepository.getFilters();
    res.json(filters);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
