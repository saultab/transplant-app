'use strict';

const express = require('express');
const router = express.Router();
const { chatRepository, messageRepository } = require('../db/chat.repository');
const { validate, validators } = require('../middleware/validation');

// GET /api/chats - Get all chat conversations
router.get('/', (req, res, next) => {
  try {
    const chats = chatRepository.getAll();
    res.json(chats);
  } catch (err) {
    next(err);
  }
});

// POST /api/chats - Add a new chat
router.post('/', validators.addChat, validate, (req, res, next) => {
  try {
    const id = chatRepository.create(req.body.chat);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/chats/:userID - Delete a chat
router.delete('/:userID', validators.userIdParam, validate, (req, res, next) => {
  try {
    chatRepository.delete(req.params.userID);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// PUT /api/chats/message-time - Update message time for a chat
router.put('/message-time', validators.updateMessageTime, validate, (req, res, next) => {
  try {
    chatRepository.updateMessageTime(req.body.messageTime, req.body.userID);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/chats/messages - Get all messages
router.get('/messages', (req, res, next) => {
  try {
    const messages = messageRepository.getAll();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// POST /api/chats/messages - Add a message
router.post('/messages', validators.addMessage, validate, (req, res, next) => {
  try {
    const id = messageRepository.create(req.body.sms);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/chats/messages/:_id/:friendID - Delete a message
router.delete('/messages/:_id/:friendID', validators.deleteMessage, validate, (req, res, next) => {
  try {
    messageRepository.delete(req.params._id, req.params.friendID);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
