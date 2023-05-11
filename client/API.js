import Constants from "expo-constants";

const { manifest } = Constants;

const URL = `http://${manifest.debuggerHost.split(':').shift()}:3001/api`;

async function getListInfoUser() {
  try {
    const response = await fetch(URL + '/infoUser');
    const infoUserJson = await response.json();
    if (!response.ok) {
      throw new Error(infoUserJson);
    }
    return infoUserJson.map((es) => ({ userID: es.userID, transplant: es.transplant, telephone: es.telephone, birthdate: es.birthdate, nationality: es.nationality, employ: es.employ,userImg: es.userImg, userName: es.userName,request_state: es.request_state, percentage: es.percentage, bio:es.bio  }));
  } catch (err) {
    throw err;
  }
}

// call PUT /api/infoUser/updateState
function updateListInfoUser(userID, request_state) {
  return new Promise((resolve, reject) => {
    fetch(URL + '/infoUser/updateState', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: userID, request_state: request_state }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((obj) => { reject(obj); })
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
}

// call PUT /api/chats/update
function updateMessageTime(messageTime,userID) {
  return new Promise((resolve, reject) => {
    fetch(URL + '/chats/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messageTime: messageTime ,userID: userID }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((obj) => { reject(obj); })
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
}

async function getFilters() {
  try {
    const response = await fetch(URL + '/filters');
    const filtersJson = await response.json();
    if (!response.ok) {
      throw new Error(filtersJson);
    }
    return filtersJson.map((es) => ({ userID: es.userID, filter: es.filter    }));
  } catch (err) {
    throw err;
  }
}

async function getListChats() {
  try {
    const response = await fetch(URL + '/chats');
    const chatsJson = await response.json();
    if (!response.ok) {
      throw new Error(chatsJson);
    }
    return chatsJson.map((es) => ({
      userID: es.userID, userName: es.userName, userImg: es.userImg, messageTime: es.messageTime, messageText: es.messageText, idGlobal: es.idGlobal, bio: es.bio
    }));
  } catch (err) {
    throw err;
  }
}

function addListChats(chat) {
  // call: POST /api/singleChat/add
  return new Promise((resolve, reject) => {
    fetch(URL + '/chats/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  chat: chat }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          response.json()
            .then((message) => { reject(message); }) 
            .catch(() => { reject({ error: "Cannot parse server response." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
  });
}

async function getSingleChat() {
  try {
    const response = await fetch(URL + '/singleChat');
    const chatsJson = await response.json();
    if (!response.ok) {
      throw new Error(chatsJson);
    }
    return chatsJson.map((es) => ({
      friendID: es.friendID, myID: es.myID, _id: es._id, text: es.text, type: es.type, idGlobal: es.idGlobal
    }));
  } catch (err) {
    throw err;
  }
}

function addMessage(sms) {
  // call: POST /api/singleChat/add
  return new Promise((resolve, reject) => {
    fetch(URL + '/singleChat/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  sms: sms }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          response.json()
            .then((message) => { reject(message); }) 
            .catch(() => { reject({ error: "Cannot parse server response." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
  });
}

function deleteMessage(_id, friendID) {
  // call: DELETE /api/singleChat/delete/:_id/:friendID
  return new Promise((resolve, reject) => {
    fetch(URL + `/singleChat/delete/${_id}/${friendID}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((message) => { reject(message); }) 
          .catch(() => { reject({ error: "Cannot parse server response." }) }); 
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
}

async function getListChallenge() {
  try {
    const response = await fetch(URL + '/challenge');
    const challengeJson = await response.json();
    if (!response.ok) {
      throw new Error(challengeJson);
    }
    return challengeJson.map((es) => ({
      id: es.id,
      titolo: es.titolo,
      descrizione: es.descrizione,
      hastag: es.hastag,
    }));
  } catch (err) {
    throw err;
  }
}

async function getChallByUser() {
    // call  /api/challenge/users
    const response = await fetch((URL + '/challenge/users' ));
    const challengeJson = await response.json();
    if (response.ok) {
      return challengeJson.map((cha) => ({
          idUsers: cha.userID, id: cha.id, titolo: cha.titolo, descrizione: cha.descrizione, hastag: cha.hastag, completed: cha.completed
      }));
    } else {
      throw challengeJson; 
    }
  }

 async function getMyInfo() {
  // call /api/my_info
  const response = await fetch((URL + '/my_info' ));
    const my_info = await response.json();
    if (response.ok) {
      return my_info.map((es) => ({
        superUser: es.superUser, name: es.name, phone : es.phone, hospital: es.hospital, transplant: es.transplant, bio:es.bio, email: es.email, noPhone: es.noPhone, birth: es.birth, date_surgery: es.date_surgery, personal_interest: es.personal_interest, see_photo: es.see_photo, see_phone: es.see_phone, tone: es.tone, vibration: es.vibration, show_sms: es.show_sms, sound_sms: es.sound_sms, language: es.language }));
    } else {
      throw my_info; 
    }
 } 

 // call PUT /api/my_info/updateMyInfo
function updateMyInfo(myInfo) {
  return new Promise((resolve, reject) => {
    fetch(URL + '/my_info/updateMyInfo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ myInfo: myInfo}),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((obj) => { reject(obj); })
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
}

function addChallenge(challenge, user) {
  // call: POST /api/challenge/add
  return new Promise((resolve, reject) => {
    fetch(URL + '/challenge/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ challenge: challenge, user: user }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          response.json()
            .then((message) => { reject(message); }) 
            .catch(() => { reject({ error: "Cannot parse server response." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
  });
}

function deleteChallenge(userID, challengeID) {
    // call: DELETE /api/challenge/delete/:userID/:challengeID
    return new Promise((resolve, reject) => {
      fetch(URL + `/challenge/delete/${userID}/${challengeID}`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          response.json()
            .then((message) => { reject(message); }) 
            .catch(() => { reject({ error: "Cannot parse server response." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
  }

function deleteFromChatLists(userID) {
    // call: DELETE /api/chats/delete/:userID
    return new Promise((resolve, reject) => {
      fetch(URL + `/chats/delete/${userID}`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          response.json()
            .then((message) => { reject(message); }) 
            .catch(() => { reject({ error: "Cannot parse server response  `/chats/delete/${userID}`." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
  }

   // call PUT /api/challenge/update
function updateChallenge(challenge) {
  return new Promise((resolve, reject) => {
    fetch(URL + '/challenge/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ challenge: challenge}),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((obj) => { reject(obj); })
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
}

const API = { getListChallenge, deleteChallenge, addChallenge, updateChallenge, getChallByUser, getListChats, getListInfoUser, getSingleChat, addMessage, deleteMessage, addListChats,updateListInfoUser, deleteFromChatLists, getFilters, updateMessageTime, getMyInfo, updateMyInfo };
export default API;