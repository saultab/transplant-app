'use strict';

const { getDb } = require('./connection');

const userRepository = {
  getMyInfo() {
    const db = getDb();
    const sql = `SELECT * FROM my_info`;
    return db.prepare(sql).all();
  },

  updateMyInfo(myInfo) {
    const db = getDb();
    const sql = `
      UPDATE my_info
      SET name=?, hospital=?, phone=?, transplant=?, email=?, bio=?, birth=?, date_surgery=?,
          personal_interest=?, see_photo=?, see_phone=?, tone=?, vibration=?, show_sms=?,
          sound_sms=?, language=?
      WHERE superUser = ?
    `;
    db.prepare(sql).run(
      myInfo.name, myInfo.hospital, myInfo.phone, myInfo.transplant,
      myInfo.email, myInfo.bio, myInfo.birth, myInfo.date_surgery,
      myInfo.personal_interest, myInfo.see_photo, myInfo.see_phone,
      myInfo.tone, myInfo.vibration, myInfo.show_sms, myInfo.sound_sms,
      myInfo.language, myInfo.superUser
    );
  },

  getAllInfoUsers() {
    const db = getDb();
    const sql = `
      SELECT userID, transplant, telephone, birthdate, nationality, employ,
             userImg, userName, request_state, percentage, bio
      FROM info_user
    `;
    return db.prepare(sql).all();
  },

  updateRequestState(userID, requestState) {
    const db = getDb();
    const sql = `UPDATE info_user SET request_state = ? WHERE userID = ?`;
    db.prepare(sql).run(requestState, userID);
  },

  getFilters() {
    const db = getDb();
    const sql = `SELECT userID, filter FROM users_filter`;
    return db.prepare(sql).all();
  },
};

module.exports = { userRepository };
