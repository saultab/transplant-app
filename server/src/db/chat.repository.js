'use strict';

const { getDb } = require('./connection');

const chatRepository = {
  getAll() {
    const db = getDb();
    const sql = `
      SELECT cl.userID, cl.userName, cl.userImg, cl.messageTime,
             sc.text AS messageText, sc.idGlobal, iu.bio
      FROM chat_list cl
      JOIN single_chat sc ON cl.userID = sc.friendID
      JOIN info_user iu ON iu.userID = cl.userID
      WHERE iu.request_state = 'friend'
        AND sc._id = (SELECT MAX(s._id) FROM single_chat s WHERE s.friendID = cl.userID)
      ORDER BY sc.idGlobal DESC
    `;
    return db.prepare(sql).all();
  },

  create(chat) {
    const db = getDb();
    const sql = `INSERT INTO chat_list (userID, userName, userImg, messageTime) VALUES (?, ?, ?, ?)`;
    const result = db.prepare(sql).run(chat.userID, chat.userName, chat.userImg, chat.messageTime);
    return result.lastInsertRowid;
  },

  delete(userID) {
    const db = getDb();
    const sql = `DELETE FROM chat_list WHERE userID = ?`;
    db.prepare(sql).run(userID);
  },

  updateMessageTime(messageTime, userID) {
    const db = getDb();
    const sql = `UPDATE chat_list SET messageTime = ? WHERE userID = ?`;
    db.prepare(sql).run(messageTime, userID);
  },
};

const messageRepository = {
  getAll() {
    const db = getDb();
    const sql = `SELECT friendID, myID, _id, text, type, idGlobal FROM single_chat`;
    return db.prepare(sql).all();
  },

  create(sms) {
    const db = getDb();
    const sql = `INSERT INTO single_chat (friendID, myID, _id, text, type, idGlobal) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = db.prepare(sql).run(sms.friendID, sms.myID, sms._id, sms.text, sms.type, sms.idGlobal);
    return result.lastInsertRowid;
  },

  delete(_id, friendID) {
    const db = getDb();
    const sql = `DELETE FROM single_chat WHERE _id = ? AND friendID = ?`;
    db.prepare(sql).run(_id, friendID);
  },
};

module.exports = { chatRepository, messageRepository };
