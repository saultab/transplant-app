import React, { useState, useEffect } from 'react';
import MainContainer from './navigation/MainContainer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import API from './API';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function App() {

  const [dirty, setDirty] = useState(true);
  const [superUser, setSuperUser] = useState(1);
  const [listChallenge, setListChallenge] = useState([]); //lista challenge totale
  const [listChallSuperUser, setListChallSuperUser] = useState([]); //lista challenge superUser
  const [listChallNormalUser, setListChallNormalUser] = useState([]); //lista challenge normalUser
  const [listChats, setListChats] = useState([]); // lista delle chats con id di ogni utente che spuntano nella schermata principale con tutte le chat recenti
  const [listSingleChat, setListSingleChats] = useState([]); // lista dei messaggi  di ogni utente
  const [listFriendsUser, setListFriendsUser] = useState([]); // lista degli amici di ogni User
  const [listNonFriends, setListNonfriends] = useState([]); // lista delle richieste di amicizia scartate e delle richieste di amicizia mandate da noi
  const [listSuggestMe, setListSuggestMe] = useState([]); // lista dei suggest me
  const [listReqFriendship, setListReqFriendship] = useState([]); // lista delle richieste di amicizia ricevute
  const [listReqSentFriendship, setlistReqSentFriendship] = useState([]); // lista delle richieste di amicizia inviate
  const [listSearchFriend, setListSearchFriend] = useState([]); // lista delle persone nella ricerca con filtri
  const [filters, setFilters] = useState([]); // lista dei filtri utenti.
  const [totalMex, setTotalMex] = useState(); //numero totale di messaggi mandati globalmente

  
  const [dirty2, setDirty2] = useState(false);  //mi serve solo per il path delle foto
  const [dirty3, setDirty3] = useState(true); //mi serve solo per sincronizzare l'ultimo messaggio da visualizzare sulla chat
  const [dirty4, setDirty4] = useState(false);//mi serve solo per sincronizzare l'ultimo messaggio da visualizzare sulla schermata principale con tutte le chat aperte
  const [dirty5, setDirty5] = useState(false); // mi serve solo per il path delle foto della lista amici
  const [dirty6, setDirty6] = useState(false); // mi serve per aggiornare la lista delgli amici in base alla request_state
  const [dirty7, setDirty7] = useState(true); // usato per aggiornare le modifiche al superUser
  const [myInfo, setMyInfo] = useState({});

  const path = [{
    userID: 2,
    userImg: require('./assets/users/2.jpg'),
  }, {
    userID: 3,
    userImg: require('./assets/users/3.jpg'),
  }, {
    userID: 4,
    userImg: require('./assets/users/4.jpg'),
  }, {
    userID: 5,
    userImg: require('./assets/users/5.jpg'),
  }, {
    userID: 6,
    userImg: require('./assets/users/6.jpg'),
  }, {
    userID: 7,
    userImg: require('./assets/users/7.jpg'),
  }, {
    userID: 8,
    userImg: require('./assets/users/8.jpg'),
  }, {
    userID: 9,
    userImg: require('./assets/users/9.jpg'),
  }, {
    userID: 10,
    userImg: require('./assets/users/10.jpg'),
  }, {
    userID: 11,
    userImg: require('./assets/users/11.jpg'),
  }, {
    userID: 12,
    userImg: require('./assets/users/12.jpg'),
  }, {
    userID: 13,
    userImg: require('./assets/users/13.jpg'),
  }, {
    userID: 14,
    userImg: require('./assets/users/14.jpg'),
  }, {
    userID: 15,
    userImg: require('./assets/users/15.jpg'),
  }, {
    userID: 16,
    userImg: require('./assets/users/16.jpg'),
  }, {
    userID: 17,
    userImg: require('./assets/users/17.jpg'),
  }, {
    userID: 18,
    userImg: require('./assets/users/18.jpg'),
  }, {
    userID: 19,
    userImg: require('./assets/users/19.jpg'),
  }, {
    userID: 20,
    userImg: require('./assets/users/20.jpg'),
  }, {
    userID: 21,
    userImg: require('./assets/users/21.jpg'),
  }, {
    userID: 22,
    userImg: require('./assets/users/22.jpg'),
  }, {
    userID: 23,
    userImg: require('./assets/users/23.jpg'),
  }, {
    userID: 24,
    userImg: require('./assets/users/24.jpg'),
  }, {
    userID: 25,
    userImg: require('./assets/users/25.jpg'),
  }, {
    userID: 26,
    userImg: require('./assets/users/26.jpg'),
  }, {
    userID: 27,
    userImg: require('./assets/users/27.jpg'),
  }, {
    userID: 28,
    userImg: require('./assets/users/28.jpg'),
  }, {
    userID: 29,
    userImg: require('./assets/users/29.jpg'),
  }, {
    userID: 30,
    userImg: require('./assets/users/30.jpg'),
  }, {
    userID: 31,
    userImg: require('./assets/users/31.jpg'),
  }, {
    userID: 32,
    userImg: require('./assets/users/32.jpg'),
  }, {
    userID: 33,
    userImg: require('./assets/users/33.jpg'),
  }, {
    userID: 34,
    userImg: require('./assets/users/34.jpg'),
  }, {
    userID: 35,
    userImg: require('./assets/users/35.jpg'),
  }, {
    userID: 36,
    userImg: require('./assets/users/36.jpg'),
  }, {
    userID: 37,
    userImg: require('./assets/users/37.jpg'),
  }, {
    userID: 38,
    userImg: require('./assets/users/38.jpg'),
  }, {
    userID: 39,
    userImg: require('./assets/users/39.jpg'),
  }, {
    userID: 40,
    userImg: require('./assets/users/40.jpg'),
  }
    ,];

  const pathPercentage = [{
    val: 50,
    percentage: require('./assets/percentage/50.png'),
  }, {
    val: 70,
    percentage: require('./assets/percentage/70.png'),
  }, {
    val: 90,
    percentage: require('./assets/percentage/90.png'),
  }, {
    val: 100,
    percentage: require('./assets/percentage/100.png'),
  },];

  const pathChallenge = [{
    id:1,
    ChallengeImg: require('./assets/challenge/1.jpg'),
  },{
    id:2,
    ChallengeImg: require('./assets/challenge/2.jpg'),
  },{
    id:3,
    ChallengeImg: require('./assets/challenge/3.jpg'),
  },{
    id:4,
    ChallengeImg: require('./assets/challenge/4.jpg'),
  },{
    id:5,
    ChallengeImg: require('./assets/challenge/5.jpg'),
  },{
    id:6,
    ChallengeImg: require('./assets/challenge/6.jpg'),
  },{
    id:7,
    ChallengeImg: require('./assets/challenge/7.jpg'),
  },{
    id:8,
    ChallengeImg: require('./assets/challenge/8.jpg'),
  },{
    id:9,
    ChallengeImg: require('./assets/challenge/9.jpg'),
  },{
    id:10,
    ChallengeImg: require('./assets/challenge/10.jpg'),
  },{
    id:11,
    ChallengeImg: require('./assets/challenge/11.jpg'),
  },{
    id:12,
    ChallengeImg: require('./assets/challenge/12.jpg'),
  },{
    id:13,
    ChallengeImg: require('./assets/challenge/13.jpg'),
  },{
    id:14,
    ChallengeImg: require('./assets/challenge/14.jpg'),
  },{
    id:15,
    ChallengeImg: require('./assets/challenge/15.jpg'),
  },
];
  function handleError(err) { console.log(err); }

  useEffect(() => {
    if(dirty7)
      API.getMyInfo().then(list => {setMyInfo(() => {return {...list[0], userImg: require('./assets/users/1.jpg') }}); setDirty7(false);}).catch(err => handleError(err));
  }, [dirty7])

  useEffect(() => {
    API.getListChallenge().then(list => 
      setListChallenge(list.map((item) => {
        let index = pathChallenge.filter(riga => riga.id === item.id)[0];
        return {
          ...item,
          ChallengeImg: index.ChallengeImg,
        }
      }))).catch(err => handleError(err));
  }, [])

  useEffect(() => {
    API.getFilters().then(list => setFilters(list)).catch(err => handleError(err));
  }, [])

  useEffect(() => {
    if (dirty4) {
      API.getListChats().then(list => {
        setDirty4(false);
        setListChats(list.map((item) => {
          if (item.messageText.length > 37) {
            return {
              ...item,
              messageText: item.messageText.substring(0, 37).concat(" ..."),
            }
          }
          else
            return { ...item }
        }));
        setDirty2(false);
      }).catch(err => handleError(err));
    }
  }, [dirty4])

  useEffect(() => {
    if (dirty6 === false) {
      API.getListInfoUser().then(list => {
        setListFriendsUser(list.filter(row => row.request_state == "friend"));
        setListNonfriends(list.filter(row => row.request_state == "not_friend"));
        setListSuggestMe(list.filter(row => row.request_state == "suggest_me"));
        setListSearchFriend(list.filter(row => row.request_state == "friend_search"));
        setListReqFriendship(list.filter(row => row.request_state == "request_pending"));
        setlistReqSentFriendship(list.filter(row => row.request_state == "request_sent"));
        setDirty5(true);
        setDirty6(true);
      }).catch(err => handleError(err));
    }
  }, [dirty6])

  useEffect(() => {
    if (dirty5) {
      setListFriendsUser(list => list.map((item) => {
        let index = path.filter(riga => riga.userID === item.userID)[0];
        return {
          ...item,
          userImg: index.userImg,
        }
      }));
      setListSuggestMe(list => list.map((item) => {
        let index = path.filter(riga => riga.userID === item.userID)[0];
        let indexPercent = pathPercentage.filter(riga => riga.val === item.percentage)[0];
        return {
          ...item,
          userImg: index.userImg,
          percentagePath: indexPercent.percentage,
        }
      }));
      setListReqFriendship(list => list.map((item) => {
        let index = path.filter(riga => riga.userID === item.userID)[0];
        return {
          ...item,
          userImg: index.userImg,
        }
      }));
      setListSearchFriend(list => list.map((item) => {
        let index = path.filter(riga => riga.userID === item.userID)[0];
        return {
          ...item,
          userImg: index.userImg,
        }
      }));
      setListNonfriends(list => list.map((item) => {
        let index = path.filter(riga => riga.userID === item.userID)[0];
        return {
          ...item,
          userImg: index.userImg,
        }
      }));
      setlistReqSentFriendship(list => list.map((item) => {
        let index = path.filter(riga => riga.userID === item.userID)[0];
        return {
          ...item,
          userImg: index.userImg,
        }
      }));
      setDirty5(false);
    }
  }, [dirty5])

  useEffect(() => {
    if (dirty3) {
      API.getSingleChat().then(list => { setDirty3(false); setListSingleChats(list); setDirty4(true); setTotalMex(list.length); }).catch(err => handleError(err));
    }
  }, [dirty3])

  useEffect(() => {
    if (listChats.length > 0 && dirty2 === false) {
      setListChats(list => list.map((item) => {
        let index = path.filter(riga => riga.userID === item.userID)[0];
        return {
          ...item,
          userImg: index.userImg,
        }
      }));
      setDirty2(true);
      setDirty6(false);
    }
  }, [listChats, dirty2])

  useEffect(() => {
    if (superUser === 1 && dirty) {
      API.getChallByUser().then(list => {
        setListChallNormalUser(list.filter(row => row.idUsers != superUser).map((item) => {
          let index = pathChallenge.filter(riga => riga.id === item.id)[0];
          return {
            ...item,
            ChallengeImg: index.ChallengeImg,
          }
        }));
        setListChallSuperUser(list.filter(row => row.idUsers == superUser).filter(row => row.completed != "true")
        .concat(list.filter(row => row.idUsers == superUser).filter(row => row.completed == "true")).map((item) => {
          let index = pathChallenge.filter(riga => riga.id === item.id)[0];
          return {
            ...item,
            ChallengeImg: index.ChallengeImg,
          }
        }));
        setDirty(false);
      }).catch(err => handleError(err));
    }
  }, [dirty])

  function deleteChallenge(superUser, challengeID) {
    API.deleteChallenge(superUser, challengeID).then(() => setDirty(true)).catch(err => handleError(err));
  }

  function addChallenge(challengeID, superUser) {
    API.addChallenge(challengeID, superUser).then(() => setDirty(true)).catch(err => handleError(err));
  }

  function addMessage(newSms) {
    API.addMessage(newSms).then(() => setDirty3(true)).catch(err => handleError(err));
  }

  function deleteMessage(_id, friendID) {
    API.deleteMessage(_id, friendID).then(() => setDirty3(true)).catch(err => handleError(err));
  }

  function addListChats(chat) {
    API.addListChats(chat).then(() => setDirty4(true)).catch(err => handleError(err));
  }

  function updateListInfoUser(userID, request_state) {
    API.updateListInfoUser(userID, request_state).then(() => {
      //API.deleteFromChatLists(userID).then(() => {} ).catch(err => handleError(err));
      //purtroppo non funziona. Penso perche voglio fare 2 API concatenate, ma l'idea era corretta,
      // cioè rimuovere la chat con l'utente che non è piu mio amico dal db, 
      //invece ho trovato una scorciatoia evitando di prendere chat dal db che non sono miei amici.
      // Funziona uguale ma non modifico il db con una delete.
      setDirty4(true);
    }).catch(err => handleError(err));
  }

  function updateMessageTime(messageTime,userID) {
    API.updateMessageTime(messageTime,userID).then( () => {setDirty4(true)} ).catch(err => handleError(err));
  }

  function updateMyInfo(myInfo) {
    API.updateMyInfo(myInfo).then(()=> {setDirty7(true)}).catch((err)=> handleError(err));
  }

  function updateChallenge(challenge) {
    API.updateChallenge(challenge).then(()=> {setDirty(true)}).catch((err)=> handleError(err));
  } 
  return (
    <>
      <NavigationContainer>
        <MainContainer listChallenge={listChallenge} listChallSuperUser={listChallSuperUser}
          listChallNormalUser={listChallNormalUser} deleteChallenge={deleteChallenge} addChallenge={addChallenge} updateChallenge={updateChallenge}
          listChats={listChats} setListChats={setListChats} listSingleChat={listSingleChat} listFriendsUser={listFriendsUser} addMessage={addMessage} deleteMessage={deleteMessage} listNonFriends={listNonFriends} setListNonfriends={setListNonfriends} listSearchFriend={listSearchFriend} listReqFriendship={listReqFriendship} listSuggestMe={listSuggestMe} addListChats={addListChats} updateListInfoUser={updateListInfoUser} filters={filters} listReqSentFriendship={listReqSentFriendship} myInfo={myInfo} setMyInfo={setMyInfo} totalMex={totalMex} updateMessageTime={updateMessageTime} updateMyInfo={updateMyInfo} />
      </NavigationContainer>
    </>
  );
}

export default App; 