/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./messages.js":
/*!*********************!*\
  !*** ./messages.js ***!
  \*********************/
/***/ ((module) => {

var publicMessages = [{
  sender: "Harry",
  time: "2024-11-08 10:00:25",
  content: "Good mornming!",
  timestamp: 1721298470071
}, {
  sender: "Draco",
  time: "2024-11-08 10:02:10",
  content: "You too.",
  timestamp: 1721298470072
}, {
  sender: "Yiwen",
  time: "2024-11-08 10:10:35",
  content: "Bad news: Yesterday was Thursday bu I forgot to buy F4.",
  timestamp: 1721298470073
}, {
  sender: "Draco",
  time: "2024-11-09 10:15:35",
  content: "It's a cold day.",
  timestamp: 1731301057638
}];
function addPublicMessage(sender, content) {
  var time = getTime();
  var timestamp = Date.now();
  publicMessages.push({
    sender: sender,
    time: time,
    content: content,
    timestamp: timestamp
  });
}
function getNewPublicMessages(lastUpdated) {
  return publicMessages.filter(function (msg) {
    return msg.timestamp >= lastUpdated;
  });
}
function getTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  var hours = String(date.getHours()).padStart(2, '0');
  var minutes = String(date.getMinutes()).padStart(2, '0');
  var seconds = String(date.getSeconds()).padStart(2, '0');
  return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
var dmMessages = {
  "Draco_Harry": [{
    sender: "Harry",
    time: "2024-11-08 11:24:25",
    content: "Have you finished project2?",
    timestamp: 1
  }, {
    sender: "Draco",
    time: "2024-11-08 11:25:25",
    content: "Not yet.",
    timestamp: 2
  }],
  "Harry_Yiwen": [{
    sender: "Harry",
    time: "2024-11-08 13:46:10",
    content: "Would you like to have some mochinuts?",
    timestamp: 1
  }, {
    sender: "Yiwen",
    time: "2024-11-08 13:49:16",
    content: "Why not? I’m just about to head out.",
    timestamp: 2
  }, {
    sender: "Harry",
    time: "2024-11-08 13:50:16",
    content: "See you in the lobby.",
    timestamp: 3
  }]
};
function addDmMessage(chatPair, sender, content) {
  if (!dmMessages[chatPair]) {
    dmMessages[chatPair] = [];
  }
  var timestamp = Date.now();
  var time = getTime();
  dmMessages[chatPair].push({
    sender: sender,
    time: time,
    content: content,
    timestamp: timestamp
  });
}
function createChatPair(user1, user2) {
  var chatPair = [user1, user2].sort().join("_");
  return chatPair;
}
function getNewDmMessages(chatPair, lastUpdated) {
  if (!dmMessages[chatPair]) {
    return [];
  }
  return dmMessages[chatPair].filter(function (msg) {
    return msg.timestamp > lastUpdated;
  });
}
var messages = {
  publicMessages: publicMessages,
  addPublicMessage: addPublicMessage,
  getNewPublicMessages: getNewPublicMessages,
  dmMessages: dmMessages,
  addDmMessage: addDmMessage,
  createChatPair: createChatPair,
  getNewDmMessages: getNewDmMessages
};
module.exports = messages;

/***/ }),

/***/ "./src/listener.js":
/*!*************************!*\
  !*** ./src/listener.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDmListener: () => (/* binding */ addDmListener),
/* harmony export */   addLoginListener: () => (/* binding */ addLoginListener),
/* harmony export */   addLogoutListener: () => (/* binding */ addLogoutListener),
/* harmony export */   addSendListener: () => (/* binding */ addSendListener),
/* harmony export */   clearIntervalId: () => (/* binding */ clearIntervalId),
/* harmony export */   startPolling: () => (/* binding */ startPolling)
/* harmony export */ });
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../messages */ "./messages.js");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_messages__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view */ "./src/view.js");




var intervalId = null;
function addLoginListener(_ref) {
  var appEl = _ref.appEl,
    userState = _ref.userState;
  appEl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!event.target.classList.contains("login-form")) {
      return;
    }
    var username = document.querySelector('.enter-username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.loadLogin)();
    (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
      appEl: appEl,
      userState: userState
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username, userState.pubLastUpdated).then(function (info) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.loadChat)();
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.loadLoginFinish)();
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setUsersList)(info.userList);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setPubMsg)(info.newPublicMessages);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setLogin)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setPubUpdate)();
      (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderChat)({
        appEl: appEl,
        userState: userState
      });
      return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchPublicList)(userState.pubLastUpdated);
    }).then(function (newMsg) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setPubMsg)(newMsg);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.loadChatFinish)();
      (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderChat)({
        appEl: appEl,
        userState: userState
      });
      startPolling(appEl, userState);
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)(err.error);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.loadLoginFinish)();
      (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
        appEl: appEl,
        userState: userState
      });
      var errorMessageEl = appEl.querySelector('.error-message');
      if (errorMessageEl) {
        errorMessageEl.style.display = 'block';
      }
    });
  });
}
function addSendListener(_ref2) {
  var appEl = _ref2.appEl,
    userState = _ref2.userState;
  appEl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!event.target.classList.contains("send-box")) {
      return;
    }
    var content = appEl.querySelector('.enter-msg').value.trim();
    var msgEl = appEl.querySelector(".msg-list");
    appEl.querySelector('.enter-msg').value = '';
    var isPublicChannel = appEl.querySelector('.public-channel').classList.contains('focused');
    if (isPublicChannel) {
      (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAddPublicMsg)(content, userState.pubLastUpdated).then(function (newMessages) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setPubMsg)(newMessages);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderPubMsgList)({
          msgEl: msgEl,
          userState: userState
        });
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)(err.error);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
          appEl: appEl,
          userState: userState
        });
        var errorMessageEl = appEl.querySelector('.error-message');
        if (errorMessageEl) {
          errorMessageEl.style.display = 'block';
        }
      });
    } else {
      var chatUnit = appEl.querySelector('.chat-unit.focused');
      var receiver = chatUnit.querySelector('.receiver-name').textContent;
      var chatPair = (0,_messages__WEBPACK_IMPORTED_MODULE_0__.createChatPair)(userState.username, receiver);
      (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAddDmMessage)(userState.username, receiver, content, userState.dmLastUpdated[chatPair]).then(function (newMessages) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setDmMsg)(newMessages, chatPair);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderDmMsgList)({
          msgEl: msgEl,
          userState: userState,
          chatPair: chatPair
        });
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)(err.error);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
          appEl: appEl,
          userState: userState
        });
        var errorMessageEl = appEl.querySelector('.error-message');
        if (errorMessageEl) {
          errorMessageEl.style.display = 'block';
        }
      });
    }
  });
}
function addLogoutListener(_ref3) {
  var appEl = _ref3.appEl,
    userState = _ref3.userState;
  appEl.addEventListener('click', function (event) {
    if (!event.target.closest('.logout-btn')) {
      return;
    }
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setLogout)();
      userState.error = "";
      (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
        appEl: appEl,
        userState: userState
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)(err.error);
      (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
        appEl: appEl,
        userState: userState
      });
    });
  });
}
function addDmListener(_ref4) {
  var appEl = _ref4.appEl,
    userState = _ref4.userState;
  appEl.addEventListener('click', function (event) {
    var isPublicChannel = event.target.closest('.public-channel');
    var chatUnit = event.target.closest('.chat-unit');
    var msgEl = appEl.querySelector('.msg-list');
    if (isPublicChannel) {
      clearFocus(appEl);
      isPublicChannel.classList.add('focused');
      (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderPubMsgList)({
        msgEl: msgEl,
        userState: userState
      });
      return;
    }
    if (chatUnit) {
      var clickedUsername = chatUnit.querySelector('.receiver-name').textContent;
      clearFocus(appEl);
      chatUnit.classList.add('focused');
      var chatPair = (0,_messages__WEBPACK_IMPORTED_MODULE_0__.createChatPair)(userState.username, clickedUsername);
      userState.dmLastUpdated[chatPair] = 0;
      (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchDmList)(userState.username, clickedUsername, userState.dmLastUpdated[chatPair]).then(function (msg) {
        userState.updateDmMessages[chatPair] = false;
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setDmMsg)(msg, chatPair);
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setDmUpdate)(chatPair);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderDmMsgList)({
          msgEl: msgEl,
          userState: userState,
          chatPair: chatPair
        });
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)(err.error);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
          appEl: appEl,
          userState: userState
        });
      });
    }
  });
}
function clearFocus(appEl) {
  appEl.querySelectorAll('.public-channel, .chat-unit').forEach(function (el) {
    return el.classList.remove('focused');
  });
}
function startPolling(appEl, userState) {
  if (!userState.loginState) {
    return;
  }
  intervalId = setInterval(function () {
    var usersEl = appEl.querySelector(".users-list");
    var msgEl = appEl.querySelector(".msg-list");
    var focusedChatUnit = appEl.querySelector(".chat-unit.focused");
    var focusedPublicChannel = appEl.querySelector(".public-channel.focused");
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchUsersList)().then(function (users) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setUsersList)(users);
      (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderUsersList)({
        usersEl: usersEl,
        userState: userState
      });
      if (focusedChatUnit) {
        var focusedUsername = focusedChatUnit.querySelector(".receiver-name").textContent;
        var newFocusedChatUnit = Array.from(usersEl.querySelectorAll(".chat-unit")).find(function (unit) {
          return unit.querySelector(".receiver-name").textContent === focusedUsername;
        });
        if (newFocusedChatUnit) {
          clearFocus(appEl);
          newFocusedChatUnit.classList.add("focused");
        }
      } else if (focusedPublicChannel) {
        var newPublicChannelEl = appEl.querySelector(".public-channel");
        if (newPublicChannelEl) {
          clearFocus(appEl);
          newPublicChannelEl.classList.add("focused");
        }
      }
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)(err.error);
      (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
        appEl: appEl,
        userState: userState
      });
    });
    if (focusedChatUnit) {
      var focusedUsername = focusedChatUnit.querySelector(".receiver-name").textContent;
      var chatPair = (0,_messages__WEBPACK_IMPORTED_MODULE_0__.createChatPair)(userState.username, focusedUsername);
      (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchDmList)(userState.username, focusedUsername, userState.dmLastUpdated[chatPair]).then(function (newMessages) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setDmMsg)(newMessages, chatPair);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderDmMsgList)({
          msgEl: msgEl,
          userState: userState,
          chatPair: chatPair
        });
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)(err.error);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
          appEl: appEl,
          userState: userState
        });
      });
    } else if (focusedPublicChannel) {
      (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchPublicList)(userState.pubLastUpdated).then(function (newMessages) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setPubMsg)(newMessages);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderPubMsgList)({
          msgEl: msgEl,
          userState: userState
        });
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)(err.error);
        (0,_view__WEBPACK_IMPORTED_MODULE_3__.renderApp)({
          appEl: appEl,
          userState: userState
        });
      });
    }
  }, 5000);
}
function clearIntervalId() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAddDmMessage: () => (/* binding */ fetchAddDmMessage),
/* harmony export */   fetchAddPublicMsg: () => (/* binding */ fetchAddPublicMsg),
/* harmony export */   fetchDmList: () => (/* binding */ fetchDmList),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchPublicList: () => (/* binding */ fetchPublicList),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsersList: () => (/* binding */ fetchUsersList)
/* harmony export */ });
function fetchSession() {
  var lastUpdated = 0;
  return fetch("/api/v1/session?lastUpdated=".concat(lastUpdated), {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogin(username, lastUpdated) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      lastUpdated: lastUpdated
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchPublicList(lastUpdated) {
  return fetch("/api/v1/publicMessages?lastUpdated=".concat(lastUpdated), {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchAddPublicMsg(content, lastUpdated) {
  return fetch('/api/v1/publicMessages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      content: content,
      lastUpdated: lastUpdated
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchDmList(sender, receiver, lastUpdated) {
  return fetch("/api/v1/dmMessages?sender=".concat(sender, "&receiver=").concat(receiver, "&lastUpdated=").concat(lastUpdated), {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchAddDmMessage(sender, receiver, content, lastUpdated) {
  return fetch('/api/v1/dmMessages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: sender,
      receiver: receiver,
      content: content,
      lastUpdated: lastUpdated
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchUsersList() {
  return fetch('/api/v1/users', {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadChat: () => (/* binding */ loadChat),
/* harmony export */   loadChatFinish: () => (/* binding */ loadChatFinish),
/* harmony export */   loadLogin: () => (/* binding */ loadLogin),
/* harmony export */   loadLoginFinish: () => (/* binding */ loadLoginFinish),
/* harmony export */   setDmMsg: () => (/* binding */ setDmMsg),
/* harmony export */   setDmUpdate: () => (/* binding */ setDmUpdate),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setLogin: () => (/* binding */ setLogin),
/* harmony export */   setLogout: () => (/* binding */ setLogout),
/* harmony export */   setPubMsg: () => (/* binding */ setPubMsg),
/* harmony export */   setPubUpdate: () => (/* binding */ setPubUpdate),
/* harmony export */   setUsersList: () => (/* binding */ setUsersList),
/* harmony export */   userState: () => (/* binding */ userState)
/* harmony export */ });
/* harmony import */ var _listener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listener */ "./src/listener.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var userState = {
  username: "",
  loginState: false,
  loginPending: false,
  chatPending: false,
  updatePublicMessages: false,
  updateDmMessages: {
    "Draco_Harry": false,
    "Harry_Yiwen": false
  },
  pubLastUpdated: 0,
  dmLastUpdated: {
    "Draco_Harry": false,
    "Harry_Yiwen": false
  },
  usersList: [],
  historyPublicMessages: [],
  newPublicMessages: [],
  newDmMessages: {},
  error: ""
};
function setLogin(username) {
  userState.username = username;
  userState.loginState = true;
  userState.error = "";
}
function loadLogin() {
  userState.loginPending = true;
}
function loadLoginFinish() {
  userState.loginPending = false;
}
function loadChat() {
  userState.chatPending = true;
}
function loadChatFinish() {
  userState.chatPending = false;
}
function setLogout() {
  userState.username = "";
  userState.loginState = false;
  userState.updatePublicMessages = false;
  (0,_listener__WEBPACK_IMPORTED_MODULE_0__.clearIntervalId)();
}
function setUsersList(users) {
  userState.usersList = users;
}
function setPubUpdate() {
  userState.updatePublicMessages = true;
  userState.pubLastUpdated = Date.now();
}
function setPubMsg(msg) {
  if (userState.updatePublicMessages) {
    var _userState$newPublicM;
    (_userState$newPublicM = userState.newPublicMessages).push.apply(_userState$newPublicM, _toConsumableArray(msg));
  } else {
    var _userState$historyPub;
    (_userState$historyPub = userState.historyPublicMessages).push.apply(_userState$historyPub, _toConsumableArray(msg));
  }
  userState.pubLastUpdated = Date.now();
}
function setDmUpdate(chatPair) {
  userState.updateDmMessages[chatPair] = true;
  userState.dmLastUpdated[chatPair] = Date.now();
}
function setDmMsg(msg, chatPair) {
  if (!userState.newDmMessages[chatPair]) {
    userState.newDmMessages[chatPair] = [];
  }
  if (userState.updateDmMessages[chatPair]) {
    var _userState$newDmMessa;
    (_userState$newDmMessa = userState.newDmMessages[chatPair]).push.apply(_userState$newDmMessa, _toConsumableArray(msg));
  } else {
    userState.newDmMessages[chatPair] = msg;
  }
  userState.dmLastUpdated[chatPair] = Date.now();
}
function setError(errorMsg) {
  userState.error = errorMessages[errorMsg] || errorMessages['default'];
  if (userState.error === 'Please login.') {
    setLogout();
  }
}
var errorMessages = {
  'auth-missing': 'Please login.',
  'required-username': 'Please enter correct username.',
  'auth-insufficient': 'This username is not allowed.',
  'content-missing': 'Please enter your message.',
  'default': 'Please login.'
};

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderApp: () => (/* binding */ renderApp),
/* harmony export */   renderChat: () => (/* binding */ renderChat),
/* harmony export */   renderDmMsgList: () => (/* binding */ renderDmMsgList),
/* harmony export */   renderPubMsgList: () => (/* binding */ renderPubMsgList),
/* harmony export */   renderUsersList: () => (/* binding */ renderUsersList)
/* harmony export */ });
function renderApp(_ref) {
  var appEl = _ref.appEl,
    userState = _ref.userState;
  var html = "\n    ".concat(generateLoginHtml(userState), "\n    ");
  appEl.innerHTML = html;
}
function renderChat(_ref2) {
  var appEl = _ref2.appEl,
    userState = _ref2.userState;
  if (userState.loginState) {
    var html = "\n    ".concat(generateUserBar(userState), "\n    ") + "\n    <div class=\"main\">\n    <div class=\"users-list\">\n    " + "\n    ".concat(generateUsersList(userState), "\n    ") + "\n    </div>\n    <div class=\"msg-board\">\n    <div class=\"msg-list\">\n    " + "\n    ".concat(generatePubMsgList(userState), "\n    ") + "</div>" + "\n    ".concat(generateSendBox(userState), "\n    ") + "\n    </div>\n    </div>";
    appEl.innerHTML = html;
  }
}
function renderUsersList(_ref3) {
  var usersEl = _ref3.usersEl,
    userState = _ref3.userState;
  if (userState.loginState) {
    var html = "".concat(generateUsersList(userState));
    usersEl.innerHTML = html;
  }
}
function renderPubMsgList(_ref4) {
  var msgEl = _ref4.msgEl,
    userState = _ref4.userState;
  if (userState.loginState) {
    var scrollPosition = msgEl.scrollTop;
    var html = "".concat(generatePubMsgList(userState));
    msgEl.scrollTop = scrollPosition;
    msgEl.innerHTML = html;
  }
}
function renderDmMsgList(_ref5) {
  var msgEl = _ref5.msgEl,
    userState = _ref5.userState,
    chatPair = _ref5.chatPair;
  if (userState.loginState) {
    var messages = userState.newDmMessages[chatPair] || [];
    var html = messages.map(function (message) {
      return "\n            <div class=\"message-unit\">\n                <div class=\"sender-avatar\">".concat(takeFirstLetter(message.sender), "</div>\n                <div class=\"message-body\">\n                    <div class=\"sender-info\">\n                        <div class=\"sender-name\">").concat(message.sender, "</div>\n                        <div class=\"send-time\">").concat(message.time, "</div>\n                    </div>\n                    <div class=\"message-content\">").concat(message.content, "</div>\n                </div>\n            </div>\n        ");
    }).join('');
    msgEl.innerHTML = html;
  }
}
function generateLoginHtml(userState) {
  if (userState.loginState) {
    return '';
  }
  if (userState.loginPending) {
    return "\n        <div class=\"load-login\">\n            <p>Logging in......</p>\n        </div>        \n        ";
  }
  return "\n        <form class=\"login-form\">\n            <input type=\"text\" class=\"enter-username\" name=\"username\" placeholder=\"Please enter your username\">\n            <button type=\"submit\" class=\"login-btn\">Login</button>\n            <small class=\"error-message\">".concat(userState.error, "</small>\n        </form>\n    ");
}
function generateUserBar(userState) {
  if (userState.loginState) {
    return "\n        <div class=\"user-bar\">\n        <div class=\"user-avatar\">".concat(takeFirstLetter(userState.username), "</div>\n        <button class=\"logout-btn\" title=\"Log out\">\n            <svg width=\"50px\" height=\"50px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path opacity=\"0.5\" d=\"M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4\" stroke=\"#ffffff\"\n                    stroke-width=\"1.5\" stroke-linecap=\"round\" />\n                <path d=\"M10 12H20M20 12L17 9M20 12L17 15\" stroke=\"#ffffff\" stroke-width=\"1.5\"\n                    stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n            </svg>\n        </button>\n        </div>");
  }
  return '';
}
function takeFirstLetter(name) {
  var firstLetter = name.split(' ').map(function (word) {
    return word[0];
  }).join('');
  return firstLetter;
}
function generateUsersList(userState) {
  if (!userState.loginState) {
    return '';
  }
  var publicChannelHtml = "\n    <button class=\"public-channel focused\">\n        <div class=\"receiver-name\"># Public channel</div>\n    </button>\n    ";
  var usersHtml = userState.usersList.filter(function (user) {
    return user !== userState.username;
  }).map(function (user) {
    return "\n            <button class=\"chat-unit\">\n                <div class=\"receiver-avatar\">".concat(takeFirstLetter(user), "</div>\n                <div class=\"receiver-name\">").concat(user, "</div>\n            </button>    \n        ");
  }).join('');
  var usersListHtml = "\n        ".concat(publicChannelHtml, "\n        ").concat(usersHtml, "\n    ");
  return usersListHtml;
}
function getDivider() {
  return "\n    <div class=\"divider\">\n        <span>History messages</span>\n    </div>\n    ";
}
function generatePubMsgList(userState) {
  if (!userState.loginState) {
    return '';
  }
  if (userState.chatPending) {
    return "\n        <div class=\"load-chat\">\n            <p>Loading......</p>\n        </div>\n        ";
  }
  var historyPubMsgList = userState.historyPublicMessages.map(function (message) {
    return "\n                    <div class=\"message-unit\">\n                        <div class=\"sender-avatar\">".concat(takeFirstLetter(message.sender), "</div>\n                        <div class=\"message-body\">\n                            <div class=\"sender-info\">\n                                <div class=\"sender-name\">").concat(message.sender, "</div>\n                                <div class=\"send-time\">").concat(message.time, "</div>\n                            </div>\n                            <div class=\"message-content\">").concat(message.content, "</div>\n                        </div>\n                    </div>\n    ");
  }).join('');
  var newPubMsgList = userState.newPublicMessages.map(function (message) {
    return "\n    <div class=\"message-unit\">\n        <div class=\"sender-avatar\">".concat(takeFirstLetter(message.sender), "</div>\n        <div class=\"message-body\">\n            <div class=\"sender-info\">\n                <div class=\"sender-name\">").concat(message.sender, "</div>\n                <div class=\"send-time\">").concat(message.time, "</div>\n            </div>\n            <div class=\"message-content\">").concat(message.content, "</div>\n        </div>\n    </div>\n");
  }).join('');
  var pubMsgList = historyPubMsgList + getDivider() + newPubMsgList;
  return pubMsgList;
}
function generateSendBox(userState) {
  if (!userState.loginState) {
    return '';
  }
  return "\n    <form class=\"send-box\">\n                    <input type=\"text\" class=\"enter-msg\" name=\"content\" placeholder=\"Please enter your message.\"\n                        required>\n                    <button class=\"send-msg\">\n\n                        <svg width=\"45px\" height=\"45px\" viewBox=\"0 0 24 24\" fill=\"none\"\n                            xmlns=\"http://www.w3.org/2000/svg\">\n                            <path\n                                d=\"M16.1391 2.95907L7.10914 5.95907C1.03914 7.98907 1.03914 11.2991 7.10914 13.3191L9.78914 14.2091L10.6791 16.8891C12.6991 22.9591 16.0191 22.9591 18.0391 16.8891L21.0491 7.86907C22.3891 3.81907 20.1891 1.60907 16.1391 2.95907ZM16.4591 8.33907L12.6591 12.1591C12.5091 12.3091 12.3191 12.3791 12.1291 12.3791C11.9391 12.3791 11.7491 12.3091 11.5991 12.1591C11.3091 11.8691 11.3091 11.3891 11.5991 11.0991L15.3991 7.27907C15.6891 6.98907 16.1691 6.98907 16.4591 7.27907C16.7491 7.56907 16.7491 8.04907 16.4591 8.33907Z\" />\n                        </svg>\n                    </button>\n                </form>\n    ";
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _listener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listener */ "./src/listener.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services */ "./src/services.js");




var appEl = document.querySelector(".bottom");
(0,_view__WEBPACK_IMPORTED_MODULE_0__.renderChat)({
  appEl: appEl,
  userState: _state__WEBPACK_IMPORTED_MODULE_1__.userState
});
(0,_listener__WEBPACK_IMPORTED_MODULE_2__.addLoginListener)({
  appEl: appEl,
  userState: _state__WEBPACK_IMPORTED_MODULE_1__.userState
});
(0,_listener__WEBPACK_IMPORTED_MODULE_2__.addDmListener)({
  appEl: appEl,
  userState: _state__WEBPACK_IMPORTED_MODULE_1__.userState
});
(0,_listener__WEBPACK_IMPORTED_MODULE_2__.addSendListener)({
  appEl: appEl,
  userState: _state__WEBPACK_IMPORTED_MODULE_1__.userState
});
(0,_listener__WEBPACK_IMPORTED_MODULE_2__.addLogoutListener)({
  appEl: appEl,
  userState: _state__WEBPACK_IMPORTED_MODULE_1__.userState
});
(0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchSession)().then(function (info) {
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.loadLogin)();
  (0,_view__WEBPACK_IMPORTED_MODULE_0__.renderApp)({
    appEl: appEl,
    userState: _state__WEBPACK_IMPORTED_MODULE_1__.userState
  });
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsersList)(info.userList);
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.setPubMsg)(info.newPublicMessages);
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.setLogin)(info.username);
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.setPubUpdate)();
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.loadLoginFinish)();
  (0,_view__WEBPACK_IMPORTED_MODULE_0__.renderChat)({
    appEl: appEl,
    userState: _state__WEBPACK_IMPORTED_MODULE_1__.userState
  });
  if (_state__WEBPACK_IMPORTED_MODULE_1__.userState.loginState) {
    (0,_listener__WEBPACK_IMPORTED_MODULE_2__.startPolling)(appEl, _state__WEBPACK_IMPORTED_MODULE_1__.userState);
  }
})["catch"](function () {
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.setLogout)();
  (0,_view__WEBPACK_IMPORTED_MODULE_0__.renderApp)({
    appEl: appEl,
    userState: _state__WEBPACK_IMPORTED_MODULE_1__.userState
  });
  var errorMessageEl = appEl.querySelector('.error-message');
  if (errorMessageEl) {
    errorMessageEl.style.display = 'block';
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map