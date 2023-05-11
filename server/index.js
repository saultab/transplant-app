'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const dao = require('./daoChallenge');
const app = express();

const os = require('os');
const ifaces = os.networkInterfaces();
let myIp;

Object.keys(ifaces).forEach(function (ifname) {
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    myIp = iface.address;
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PUT /api/my_info/updateMyInfo
app.put('/api/my_info/updateMyInfo', async (req, res) => {
    dao.updateMyInfo(req.body.myInfo).then(myInfo => res.json(myInfo)).catch(() => res.status(500).json({ error: `Database error while retrieving myInfo` }).end())
});

// GET /api/my_info
app.get('/api/my_info', async (req, res) => {
    dao.getMyInfo().then(my_info => res.json(my_info)).catch(() => res.status(500).json({ error: `Database error while retrieving my_info` }).end())
});

// GET /api/chats
app.get('/api/chats', async (req, res) => {
    dao.getListChats().then(chats => res.json(chats)).catch(() => res.status(500).json({ error: `Database error while retrieving chats` }).end())
});

// GET /api/filters
app.get('/api/filters', async (req, res) => {
    dao.getFilters().then(filters => res.json(filters)).catch(() => res.status(500).json({ error: `Database error while retrieving filters` }).end())
});

// POST /api/chats/add
app.post('/api/chats/add', async (req, res) => {
    let chat = req.body.chat;
    dao.addListChats(chat).then(chat => res.json(chat)).catch(() => res.status(500).json({ error: `Database error while retrieving chats` }).end())
});

// DELETE /api/chats/delete/:userID
app.delete('api/chats/delete/:userID',async (req, res) => {
    let userID = req.params.userID;
    try {
        await dao.deleteFromChatLists(userID);
        res.status(204).end();
    } catch (err) {
        res.status(503).json({ error: `Database error during the deletion of the chat with id: ${userID}.` });
    }
});

// GET /api/singleChat
app.get('/api/singleChat', async (req, res) => {
    dao.getSingleChat().then(chat => res.json(chat)).catch(() => res.status(500).json({ error: `Database error while retrieving singleChat` }).end())
});

// POST /api/singleChat/add 
app.post('/api/singleChat/add', async (req, res) => {
    let sms = req.body.sms;
      dao.addMessage(sms).then(sms => res.json(sms)).catch(() => res.status(500).json({ error: `Database error while adding a new sms` }).end())
});

//delete message
app.delete('/api/singleChat/delete/:_id/:friendID',async (req, res) => {
    let _id = req.params._id;
    let friendID = req.params.friendID
    try {
        await dao.deleteMessage(_id, friendID);
        res.status(204).end();
    } catch (err) {
        res.status(503).json({ error: `Database error during the deletion of the message ${_id} from the chat with : ${friendID}.` });
    }
});

// GET /api/infoUser
app.get('/api/infoUser', async (req, res) => {
    dao.getListInfoUser().then(infoUser => res.json(infoUser)).catch(() => res.status(500).json({ error: `Database error while retrieving infoUser` }).end())
});

// PUT /api/infoUser/updateState
app.put('/api/infoUser/updateState', async (req, res) => {
    dao.updateListInfoUser(req.body.userID,req.body.request_state).then(infoUser => res.json(infoUser)).catch(() => res.status(500).json({ error: `Database error while retrieving infoUser` }).end())
});

// PUT /api/chats/update
app.put('/api/chats/update', async(req,res) => {
    dao.updateMessageTime(req.body.messageTime, req.body.userID).then( updateTime => res.json(updateTime) ).catch( () =>  res.status(500).json({ error: `Database error while retrieving updateTime` }).end());
})

// GET /api/challenge
app.get('/api/challenge', async (req, res) => {
    dao.getListChallenge().then(challenge => res.json(challenge)).catch(() => res.status(500).json({ error: `Database error while retrieving challenge` }).end())
});

// GET /api/challenge/users (challenge degli utenti)
app.get('/api/challenge/users', async (req, res) => {
    dao.getChallByUser().then(challenge => res.json(challenge)).catch(() => res.status(500).json({ error: `Database error while retrieving challenge` }).end())
});

// POST /api/challenge/add (aggiungo una challenge all'utente)
app.post('/api/challenge/add', async (req, res) => {
  let challenge = req.body.challenge;
  let user = req.body.user;
    dao.addChallenge(challenge, user).then(challenge => res.json(challenge)).catch(() => res.status(500).json({ error: `Database error while creating challenge` }).end())
});

//delete challenge
app.delete('/api/challenge/delete/:userID/:challengeID',async (req, res) => {
    let userID = req.params.userID;
    let challengeID = req.params.challengeID;
    try {
        await dao.deletechallenge(userID,challengeID);
        res.status(204).end();
    } catch (err) {
        res.status(503).json({ error: `Database error during the deletion of challenge for user and id : ${userID}, ${challengeID}.` });
    }
});

// PUT /api/challenge/update
app.put('/api/challenge/update', async (req, res) => {
    let challengeID = req.body.challenge;
    dao.updateChallenge(challengeID).then(updatechallenge => res.json(updatechallenge)).catch(() => res.status(500).json({ error: `Database error while retrieving challenge` }).end())
});

const port = 3001;
app.listen(port, myIp, () => { console.log( `Server in ascolto su http://${myIp}:${port}`);});