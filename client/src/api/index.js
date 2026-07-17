import Constants from 'expo-constants';

const getBaseUrl = () => {
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }
  // Auto-detect in Expo dev mode
  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  if (debuggerHost) {
    return `http://${debuggerHost.split(':').shift()}:3001/api`;
  }
  return 'http://localhost:3001/api';
};

const BASE_URL = getBaseUrl();

/**
 * Generic fetch wrapper with error handling.
 * Prevents leaking of raw server errors to the UI.
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });

    if (response.status === 204) return null;

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (err) {
    if (err.message.includes('Network request failed')) {
      throw new Error('Unable to connect to server. Please check your connection.');
    }
    throw err;
  }
}

// ==================== User API ====================

export function getMyInfo() {
  return request('/users/me');
}

export function updateMyInfo(myInfo) {
  return request('/users/me', {
    method: 'PUT',
    body: JSON.stringify({ myInfo }),
  });
}

export function getListInfoUser() {
  return request('/users');
}

export function updateListInfoUser(userID, requestState) {
  return request('/users/state', {
    method: 'PUT',
    body: JSON.stringify({ userID, request_state: requestState }),
  });
}

export function getFilters() {
  return request('/users/filters');
}

// ==================== Chat API ====================

export function getListChats() {
  return request('/chats');
}

export function addListChats(chat) {
  return request('/chats', {
    method: 'POST',
    body: JSON.stringify({ chat }),
  });
}

export function deleteFromChatLists(userID) {
  return request(`/chats/${userID}`, { method: 'DELETE' });
}

export function updateMessageTime(messageTime, userID) {
  return request('/chats/message-time', {
    method: 'PUT',
    body: JSON.stringify({ messageTime, userID }),
  });
}

export function getSingleChat() {
  return request('/chats/messages');
}

export function addMessage(sms) {
  return request('/chats/messages', {
    method: 'POST',
    body: JSON.stringify({ sms }),
  });
}

export function deleteMessage(_id, friendID) {
  return request(`/chats/messages/${_id}/${friendID}`, { method: 'DELETE' });
}

// ==================== Challenge API ====================

export function getListChallenge() {
  return request('/challenge');
}

export function getChallByUser() {
  return request('/challenge/users');
}

export function addChallenge(challengeID, userID) {
  return request('/challenge', {
    method: 'POST',
    body: JSON.stringify({ challenge: challengeID, user: userID }),
  });
}

export function deleteChallenge(userID, challengeID) {
  return request(`/challenge/${userID}/${challengeID}`, { method: 'DELETE' });
}

export function updateChallenge(challengeID) {
  return request('/challenge', {
    method: 'PUT',
    body: JSON.stringify({ challenge: challengeID }),
  });
}

const API = {
  getMyInfo,
  updateMyInfo,
  getListInfoUser,
  updateListInfoUser,
  getFilters,
  getListChats,
  addListChats,
  deleteFromChatLists,
  updateMessageTime,
  getSingleChat,
  addMessage,
  deleteMessage,
  getListChallenge,
  getChallByUser,
  addChallenge,
  deleteChallenge,
  updateChallenge,
};

export default API;
