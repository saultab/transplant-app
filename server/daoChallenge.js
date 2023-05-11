'use strict';
const sqlite3 = require('sqlite3').verbose();
// open the database
const db = new sqlite3.Database('transplantapp.db', (err) => {
    if (err) throw err;
});

//update state in my_info
exports.updateMyInfo = (myInfo) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE my_info SET name=?, hospital=?, phone=?, transplant=?, email=?, bio=?, birth=?, date_surgery=?, personal_interest=?, see_photo=?, see_phone=?, tone=?, vibration=?, show_sms=?, sound_sms=?, language=? WHERE superUser = ?;';
        db.run(sql, [myInfo.name,myInfo.hospital,myInfo.phone,myInfo.transplant,myInfo.email,myInfo.bio, myInfo.birth, myInfo.date_surgery, myInfo.personal_interest, myInfo.see_photo,myInfo.see_phone, myInfo.tone, myInfo.vibration, myInfo.show_sms, myInfo.sound_sms, myInfo.language,
            myInfo.superUser], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}

//get my_info
exports.getMyInfo = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM my_info;';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const my_info = rows.map((es) => ({ superUser: es.superUser, name: es.name, phone: es.phone, hospital: es.hospital, transplant: es.transplant, bio: es.bio, email: es.email, noPhone: es.noPhone, birth: es.birth, date_surgery: es.date_surgery, personal_interest: es.personal_interest, see_photo: es.see_photo, see_phone: es.see_phone, tone: es.tone, vibration: es.vibration, show_sms: es.show_sms, sound_sms: es.sound_sms, language: es.language }));
            resolve(my_info);
        });
    });
};

//get filters
exports.getFilters = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users_filter;';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const filters = rows.map((es) => ({ userID: es.userID, filter: es.filter }));
            resolve(filters);
        });
    });
};

//get all listChats
exports.getListChats = () => {
    const request_state = "friend";
    return new Promise((resolve, reject) => {
        const sql = 'SELECT chat_list.userID, chat_list.userName, chat_list.userImg, chat_list.messageTime, single_chat.text as messageText, single_chat.idGlobal, info_user.bio FROM chat_list, single_chat, info_user WHERE info_user.userID=chat_list.userID AND info_user.request_state=? AND chat_list.userID = single_chat.friendID AND single_chat._id = (SELECT max(single_chat._id) FROM single_chat WHERE friendID=chat_list.userID) ORDER BY single_chat.idGlobal DESC;';
        db.all(sql, [request_state], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const chats = rows.map((es) => ({
                userID: es.userID, userName: es.userName, userImg: es.userImg, messageTime: es.messageTime, messageText: es.messageText, idGlobal: es.idGlobal, bio:es.bio
            }));
            resolve(chats);
        });
    });
};

//get single chat
exports.getSingleChat = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM single_chat;';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const chats = rows.map((es) => ({
                friendID: es.friendID, myID: es.myID, _id: es._id, text: es.text, type: es.type, idGlobal: es.idGlobal
            }));
            resolve(chats);
        });
    });
};

// delete chat from chat_list
exports.deleteFromChatLists = (userID) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM chat_list WHERE userID=?;';
        db.run(sql, [userID], (err) => {
            if (err) {
                reject(err);
                return;
            } else
                resolve(null);
        });
    });
};

//update state in chat_list
exports.updateMessageTime = (messageTime, userID) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE chat_list SET messageTime = ? WHERE userID = ?;';
        db.run(sql, [messageTime, userID], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}

// add new chat 
exports.addListChats = (chat) => {
    return new Promise((resolve, reject) => {
        const sql2 = "INSERT INTO chat_list (userID,userName,userImg,messageTime) values(?,?,?,?);"
        db.run(sql2, [chat.userID, chat.userName, chat.userImg, chat.messageTime], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

// add new message
exports.addMessage = (sms) => {
    return new Promise((resolve, reject) => {
        const sql2 = "INSERT INTO single_chat (friendID,myID,_id,text,type,idGlobal) values(?,?,?,?,?,?);"
        db.run(sql2, [sms.friendID, sms.myID, sms._id, sms.text, sms.type, sms.idGlobal], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

// delete message 
exports.deleteMessage = (_id, friendID) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM single_chat WHERE _id=? AND friendID=?;';
        db.run(sql, [_id, friendID], (err) => {
            if (err) {
                reject(err);
                return;
            } else
                resolve(null);
        });
    });
};

//get all listInfoUser
exports.getListInfoUser = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM info_user;';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const infoUser = rows.map((es) => ({ userID: es.userID, transplant: es.transplant, telephone: es.telephone, birthdate: es.birthdate, nationality: es.nationality, employ: es.employ, userImg: es.userImg, userName: es.userName, request_state: es.request_state, percentage: es.percentage, bio: es.bio }));
            resolve(infoUser);
        });
    });
};

//update state in listInfoUser
exports.updateListInfoUser = (userID, request_state) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE info_user SET request_state = ? WHERE userID = ?;';
        db.run(sql, [request_state, userID], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}
// get all challenge 
exports.getListChallenge = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM challenge;';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const challenge = rows.map((es) => ({
                id: es.id, titolo: es.titolo, descrizione: es.descrizione, hastag: es.hastag
            }));
            resolve(challenge);
        });
    });
};

//get delle challenge identificati dall'user
exports.getChallByUser = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT user_Cha.userID, cha.id, cha.titolo, cha.descrizione, cha.hastag, user_Cha.completed FROM challenge as cha, users_challenge as user_Cha WHERE cha.id=user_Cha.challengeID';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            if (rows === undefined) {
                resolve({ error: 'utente non esistente.' });
            } else {
                const challenge = rows.map((cha) => ({
                    userID: cha.userID, id: cha.id, titolo: cha.titolo, descrizione: cha.descrizione, hastag: cha.hastag, completed: cha.completed
                }));
                resolve(challenge);
            }
        });
    });
};

// add new challenge. Ma devo aggiungere anche la corrispondenza nella tabella users_challenge in base allo userID!!
exports.addChallenge = (challenge, user) => {
    return new Promise((resolve, reject) => {
        const vari = "false";
        const sql2 = "INSERT INTO users_challenge (userID,challengeID,completed) values(?,?,?);"
        db.run(sql2, [user, challenge, vari], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

// delete challenge 
exports.deletechallenge = (userID, challengeID) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users_challenge WHERE userID=? AND challengeID=?;';
        db.run(sql, [userID, challengeID], (err) => {
            if (err) {
                reject(err);
                return;
            } else
                resolve(null);
        });
    });
};



//update state in chat_list
exports.updateChallenge = (challengeID) => {
    return new Promise((resolve, reject) => {
        const vari = "true";
        const superUser=1;
        const sql = 'UPDATE users_challenge SET completed = ? WHERE userID = ? AND challengeID = ?;';
        db.run(sql, [vari, superUser, challengeID], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}