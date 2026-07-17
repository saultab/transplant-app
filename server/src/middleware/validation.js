'use strict';

const { body, param, validationResult } = require('express-validator');

/**
 * Middleware that checks for validation errors and returns 422 if any found.
 */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: 'Validation failed',
      details: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

// Reusable validation chains
const validators = {
  userIdParam: [param('userID').isInt({ min: 1 }).withMessage('userID must be a positive integer')],

  addChat: [
    body('chat.userID').isInt({ min: 1 }),
    body('chat.userName').isString().trim().notEmpty().escape(),
    body('chat.userImg').isString().trim().notEmpty(),
    body('chat.messageTime').isString().trim().notEmpty(),
  ],

  addMessage: [
    body('sms.friendID').isInt({ min: 1 }),
    body('sms.myID').isInt({ min: 1 }),
    body('sms._id').isInt({ min: 0 }),
    body('sms.text').isString().trim().notEmpty().isLength({ max: 5000 }).escape(),
    body('sms.type').isIn(['send', 'receive']),
    body('sms.idGlobal').isInt({ min: 0 }),
  ],

  deleteMessage: [
    param('_id').isInt({ min: 0 }),
    param('friendID').isInt({ min: 1 }),
  ],

  updateMessageTime: [
    body('messageTime').isString().trim().notEmpty().escape(),
    body('userID').isInt({ min: 1 }),
  ],

  updateInfoUser: [
    body('userID').isInt({ min: 1 }),
    body('request_state')
      .isIn(['friend', 'not_friend', 'suggest_me', 'friend_search', 'request_pending', 'request_sent']),
  ],

  addChallenge: [
    body('challenge').isInt({ min: 1 }),
    body('user').isInt({ min: 1 }),
  ],

  deleteChallenge: [
    param('userID').isInt({ min: 1 }),
    param('challengeID').isInt({ min: 1 }),
  ],

  updateChallenge: [
    body('challenge').isInt({ min: 1 }),
  ],

  updateMyInfo: [
    body('myInfo.name').optional().isString().trim().escape(),
    body('myInfo.hospital').optional().isString().trim().escape(),
    body('myInfo.phone').optional().isString().trim().escape(),
    body('myInfo.transplant').optional().isString().trim().escape(),
    body('myInfo.email').optional().isEmail().normalizeEmail(),
    body('myInfo.bio').optional().isString().trim().isLength({ max: 1000 }).escape(),
    body('myInfo.superUser').isInt({ min: 1 }),
  ],
};

module.exports = { validate, validators };
