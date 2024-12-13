import { clearIntervalId } from "./listener";

export const userState = {
    username: "",
    loginState: false,
    loginPending: false,
    chatPending: false,
    updatePublicMessages: false,
    updateDmMessages: {
        "Draco_Harry": false,
        "Harry_Yiwen": false,
    },
    pubLastUpdated: 0,
    dmLastUpdated: {
        "Draco_Harry": false,
        "Harry_Yiwen": false,
    },
    usersList: [],
    historyPublicMessages: [],
    newPublicMessages: [
    ],
    newDmMessages: {},
    error: ""
};

export function setLogin(username) {
    userState.username = username;
    userState.loginState = true;
    userState.error = "";
}
export function loadLogin() {
    userState.loginPending = true;
}
export function loadLoginFinish() {
    userState.loginPending = false;
}
export function loadChat() {
    userState.chatPending = true;
}
export function loadChatFinish() {
    userState.chatPending = false;
}
export function setLogout() {
    userState.username = "";
    userState.loginState = false;
    userState.updatePublicMessages = false;
    clearIntervalId();
}

export function setUsersList(users) {
    userState.usersList = users;
}
export function setPubUpdate() {
    userState.updatePublicMessages = true;
    userState.pubLastUpdated = Date.now();

}
export function setPubMsg(msg) {
    if (userState.updatePublicMessages) {
        userState.newPublicMessages.push(...msg);

    }
    else {
        userState.historyPublicMessages.push(...msg);
    }
    userState.pubLastUpdated = Date.now();

}

export function setDmUpdate(chatPair) {
    userState.updateDmMessages[chatPair] = true;
    userState.dmLastUpdated[chatPair] = Date.now();

}
export function setDmMsg(msg, chatPair) {
    if (!userState.newDmMessages[chatPair]) {
        userState.newDmMessages[chatPair] = [];
    }
    if (userState.updateDmMessages[chatPair]) {
        userState.newDmMessages[chatPair].push(...msg);

    }
    else {
        userState.newDmMessages[chatPair] = msg;

    }
    userState.dmLastUpdated[chatPair] = Date.now();

}

export function setError(errorMsg) {

    userState.error = errorMessages[errorMsg] || errorMessages['default'];
    if (userState.error === 'Please login.') {
        setLogout();
    }

}
const errorMessages = {
    'auth-missing': 'Please login.',
    'required-username': 'Please enter correct username.',
    'auth-insufficient': 'This username is not allowed.',
    'content-missing': 'Please enter your message.',
    'default': 'Please login.'
}
