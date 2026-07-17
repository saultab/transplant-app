import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../api';
import { buildImageMaps } from '../utils/assets';

const AppContext = createContext(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

export function AppProvider({ children }) {
  const [myInfo, setMyInfo] = useState({});
  const [listChallenge, setListChallenge] = useState([]);
  const [listChallSuperUser, setListChallSuperUser] = useState([]);
  const [listChallNormalUser, setListChallNormalUser] = useState([]);
  const [listChats, setListChats] = useState([]);
  const [listSingleChat, setListSingleChats] = useState([]);
  const [listFriendsUser, setListFriendsUser] = useState([]);
  const [listNonFriends, setListNonFriends] = useState([]);
  const [listSuggestMe, setListSuggestMe] = useState([]);
  const [listReqFriendship, setListReqFriendship] = useState([]);
  const [listReqSentFriendship, setListReqSentFriendship] = useState([]);
  const [listSearchFriend, setListSearchFriend] = useState([]);
  const [filters, setFilters] = useState([]);
  const [totalMex, setTotalMex] = useState(0);

  const [shouldRefreshProfile, setShouldRefreshProfile] = useState(true);
  const [shouldRefreshMessages, setShouldRefreshMessages] = useState(true);
  const [shouldRefreshChats, setShouldRefreshChats] = useState(false);
  const [shouldRefreshUsers, setShouldRefreshUsers] = useState(false);
  const [shouldRefreshChallenges, setShouldRefreshChallenges] = useState(true);

  const { userImages, percentageImages, challengeImages } = buildImageMaps();
  const superUser = 1;

  const handleError = useCallback((err) => {
    console.error('[AppContext]', err.message || err);
  }, []);

  // Attach user images to a list of user objects
  const attachUserImages = useCallback(
    (list) =>
      list.map((item) => ({
        ...item,
        userImg: userImages[item.userID],
      })),
    [userImages],
  );

  // Load profile
  useEffect(() => {
    if (!shouldRefreshProfile) return;
    API.getMyInfo()
      .then((list) => {
        if (list && list.length > 0) {
          setMyInfo({ ...list[0], userImg: userImages[1] });
        }
        setShouldRefreshProfile(false);
      })
      .catch(handleError);
  }, [shouldRefreshProfile]);

  // Load challenges catalog
  useEffect(() => {
    API.getListChallenge()
      .then((list) =>
        setListChallenge(
          list.map((item) => ({ ...item, ChallengeImg: challengeImages[item.id] })),
        ),
      )
      .catch(handleError);
  }, []);

  // Load filters
  useEffect(() => {
    API.getFilters().then(setFilters).catch(handleError);
  }, []);

  // Load messages and trigger chat refresh
  useEffect(() => {
    if (!shouldRefreshMessages) return;
    API.getSingleChat()
      .then((list) => {
        setListSingleChats(list);
        setTotalMex(list.length);
        setShouldRefreshMessages(false);
        setShouldRefreshChats(true);
      })
      .catch(handleError);
  }, [shouldRefreshMessages]);

  // Load chat list
  useEffect(() => {
    if (!shouldRefreshChats) return;
    API.getListChats()
      .then((list) => {
        const chats = list.map((item) => ({
          ...item,
          messageText:
            item.messageText && item.messageText.length > 37
              ? `${item.messageText.substring(0, 37)}...`
              : item.messageText,
          userImg: userImages[item.userID],
        }));
        setListChats(chats);
        setShouldRefreshChats(false);
        setShouldRefreshUsers(true);
      })
      .catch(handleError);
  }, [shouldRefreshChats]);

  // Load users and categorize by friendship state
  useEffect(() => {
    if (shouldRefreshUsers !== true) return;
    API.getListInfoUser()
      .then((list) => {
        const withImages = attachUserImages(list);
        setListFriendsUser(withImages.filter((u) => u.request_state === 'friend'));
        setListNonFriends(withImages.filter((u) => u.request_state === 'not_friend'));
        setListSuggestMe(
          withImages
            .filter((u) => u.request_state === 'suggest_me')
            .map((item) => ({
              ...item,
              percentagePath: percentageImages[item.percentage],
            })),
        );
        setListSearchFriend(withImages.filter((u) => u.request_state === 'friend_search'));
        setListReqFriendship(withImages.filter((u) => u.request_state === 'request_pending'));
        setListReqSentFriendship(withImages.filter((u) => u.request_state === 'request_sent'));
        setShouldRefreshUsers(false);
      })
      .catch(handleError);
  }, [shouldRefreshUsers]);

  // Load user challenges
  useEffect(() => {
    if (!shouldRefreshChallenges) return;
    API.getChallByUser()
      .then((list) => {
        const withImages = list.map((item) => ({
          ...item,
          ChallengeImg: challengeImages[item.id],
        }));
        setListChallNormalUser(withImages.filter((row) => row.idUsers !== superUser));
        const userChalls = withImages.filter((row) => row.idUsers === superUser);
        // Show incomplete first, completed last
        setListChallSuperUser([
          ...userChalls.filter((c) => c.completed !== 'true'),
          ...userChalls.filter((c) => c.completed === 'true'),
        ]);
        setShouldRefreshChallenges(false);
      })
      .catch(handleError);
  }, [shouldRefreshChallenges]);

  // ==================== Actions ====================

  const actions = {
    deleteChallenge: (userID, challengeID) => {
      API.deleteChallenge(userID, challengeID)
        .then(() => setShouldRefreshChallenges(true))
        .catch(handleError);
    },

    addChallenge: (challengeID, userID) => {
      API.addChallenge(challengeID, userID)
        .then(() => setShouldRefreshChallenges(true))
        .catch(handleError);
    },

    updateChallenge: (challengeID) => {
      API.updateChallenge(challengeID)
        .then(() => setShouldRefreshChallenges(true))
        .catch(handleError);
    },

    addMessage: (newSms) => {
      API.addMessage(newSms)
        .then(() => setShouldRefreshMessages(true))
        .catch(handleError);
    },

    deleteMessage: (_id, friendID) => {
      API.deleteMessage(_id, friendID)
        .then(() => setShouldRefreshMessages(true))
        .catch(handleError);
    },

    addListChats: (chat) => {
      API.addListChats(chat)
        .then(() => setShouldRefreshChats(true))
        .catch(handleError);
    },

    updateListInfoUser: (userID, requestState) => {
      API.updateListInfoUser(userID, requestState)
        .then(() => setShouldRefreshChats(true))
        .catch(handleError);
    },

    updateMessageTime: (messageTime, userID) => {
      API.updateMessageTime(messageTime, userID)
        .then(() => setShouldRefreshChats(true))
        .catch(handleError);
    },

    updateMyInfo: (info) => {
      API.updateMyInfo(info)
        .then(() => setShouldRefreshProfile(true))
        .catch(handleError);
    },
  };

  const value = {
    myInfo,
    setMyInfo,
    listChallenge,
    listChallSuperUser,
    listChallNormalUser,
    listChats,
    listSingleChat,
    listFriendsUser,
    listNonFriends,
    setListNonFriends,
    listSuggestMe,
    listReqFriendship,
    listReqSentFriendship,
    listSearchFriend,
    filters,
    totalMex,
    ...actions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
