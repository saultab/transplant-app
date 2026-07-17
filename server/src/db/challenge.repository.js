'use strict';

const { getDb } = require('./connection');

const challengeRepository = {
  getAll() {
    const db = getDb();
    const sql = `SELECT id, titolo, descrizione, hastag FROM challenge`;
    return db.prepare(sql).all();
  },

  getByUser() {
    const db = getDb();
    const sql = `
      SELECT uc.userID, c.id, c.titolo, c.descrizione, c.hastag, uc.completed
      FROM challenge c
      JOIN users_challenge uc ON c.id = uc.challengeID
    `;
    return db.prepare(sql).all();
  },

  addToUser(challengeID, userID) {
    const db = getDb();
    const sql = `INSERT INTO users_challenge (userID, challengeID, completed) VALUES (?, ?, 'false')`;
    const result = db.prepare(sql).run(userID, challengeID);
    return result.lastInsertRowid;
  },

  removeFromUser(userID, challengeID) {
    const db = getDb();
    const sql = `DELETE FROM users_challenge WHERE userID = ? AND challengeID = ?`;
    db.prepare(sql).run(userID, challengeID);
  },

  markCompleted(challengeID, userID) {
    const db = getDb();
    const sql = `UPDATE users_challenge SET completed = 'true' WHERE userID = ? AND challengeID = ?`;
    db.prepare(sql).run(userID, challengeID);
  },
};

module.exports = { challengeRepository };
