import { createChatPair } from "../messages";
import { fetchAddDmMessage, fetchAddPublicMsg, fetchDmList, fetchLogin, fetchLogout, fetchPublicList, fetchUsersList } from "./services";
import { loadChat, loadChatFinish, loadLogin, loadLoginFinish, setDmMsg, setDmUpdate, setError, setLogin, setLogout, setPubMsg, setPubUpdate, setUsersList } from "./state";
import { renderApp, renderChat, renderDmMsgList, renderPubMsgList, renderUsersList } from "./view";
let intervalId = null;

export function addLoginListener({ appEl, userState }) {
    appEl.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!event.target.classList.contains("login-form")) {
            return;
        }
        const username = document.querySelector('.enter-username').value;
        loadLogin();
        renderApp({ appEl, userState });
        fetchLogin(username, userState.pubLastUpdated)
            .then(info => {
                loadChat();
                loadLoginFinish();
                setUsersList(info.userList);
                setPubMsg(info.newPublicMessages);
                setLogin(username);
                setPubUpdate();
                renderChat({ appEl, userState });
                return fetchPublicList(userState.pubLastUpdated);
            }).then(newMsg => {
                setPubMsg(newMsg);
                loadChatFinish();
                renderChat({ appEl, userState });
                startPolling(appEl, userState);
            })
            .catch((err) => {
                setError(err.error);
                loadLoginFinish();
                renderApp({ appEl, userState });
                const errorMessageEl = appEl.querySelector('.error-message');
                if (errorMessageEl) {
                    errorMessageEl.style.display = 'block';
                }
            })
    })

}

export function addSendListener({ appEl, userState }) {
    appEl.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!event.target.classList.contains("send-box")) {
            return;
        }

        const content = appEl.querySelector('.enter-msg').value.trim();
        const msgEl = appEl.querySelector(".msg-list");
        appEl.querySelector('.enter-msg').value = '';

        const isPublicChannel = appEl.querySelector('.public-channel').classList.contains('focused');
        if (isPublicChannel) {
            fetchAddPublicMsg(content, userState.pubLastUpdated)
                .then(newMessages => {
                    setPubMsg(newMessages);
                    renderPubMsgList({ msgEl, userState });
                })
                .catch(err => {
                    setError(err.error);
                    renderApp({ appEl, userState });
                    const errorMessageEl = appEl.querySelector('.error-message');
                    if (errorMessageEl) {
                        errorMessageEl.style.display = 'block';
                    }
                });
        } else {
            const chatUnit = appEl.querySelector('.chat-unit.focused');
            const receiver = chatUnit.querySelector('.receiver-name').textContent;
            const chatPair = createChatPair(userState.username, receiver);

            fetchAddDmMessage(userState.username, receiver, content, userState.dmLastUpdated[chatPair])
                .then(newMessages => {

                    setDmMsg(newMessages, chatPair);
                    renderDmMsgList({ msgEl, userState, chatPair });
                })
                .catch(err => {
                    setError(err.error);
                    renderApp({ appEl, userState });
                    const errorMessageEl = appEl.querySelector('.error-message');
                    if (errorMessageEl) {
                        errorMessageEl.style.display = 'block';
                    }
                });
        }
    });
}

export function addLogoutListener({ appEl, userState }) {
    appEl.addEventListener('click', (event) => {
        if (!event.target.closest('.logout-btn')) {
            return;
        }

        fetchLogout()
            .then(() => {
                setLogout();
                userState.error = "";

                renderApp({ appEl, userState });
            })
            .catch((err) => {
                setError(err.error);
                renderApp({ appEl, userState });
            });
    });
}

export function addDmListener({ appEl, userState }) {

    appEl.addEventListener('click', (event) => {
        const isPublicChannel = event.target.closest('.public-channel');
        const chatUnit = event.target.closest('.chat-unit');
        const msgEl = appEl.querySelector('.msg-list');

        if (isPublicChannel) {
            clearFocus(appEl);
            isPublicChannel.classList.add('focused');
            renderPubMsgList({ msgEl, userState })
            return;
        }

        if (chatUnit) {
            const clickedUsername = chatUnit.querySelector('.receiver-name').textContent;

            clearFocus(appEl);
            chatUnit.classList.add('focused');
            const chatPair = createChatPair(userState.username, clickedUsername);
            userState.dmLastUpdated[chatPair] = 0;

            fetchDmList(userState.username, clickedUsername, userState.dmLastUpdated[chatPair])
                .then(msg => {
                    userState.updateDmMessages[chatPair] = false;
                    setDmMsg(msg, chatPair)
                    setDmUpdate(chatPair);
                    renderDmMsgList({ msgEl, userState, chatPair });
                }).catch(err => {
                    setError(err.error);
                    renderApp({ appEl, userState });
                });

        }
    })
}

function clearFocus(appEl) {
    appEl.querySelectorAll('.public-channel, .chat-unit').forEach(el => el.classList.remove('focused'));
}

export function startPolling(appEl, userState) {
    if (!userState.loginState) {
        return;
    }
    intervalId = setInterval(() => {

        const usersEl = appEl.querySelector(".users-list");
        const msgEl = appEl.querySelector(".msg-list");

        const focusedChatUnit = appEl.querySelector(".chat-unit.focused");
        const focusedPublicChannel = appEl.querySelector(".public-channel.focused");

        fetchUsersList()
            .then(users => {
                setUsersList(users);
                renderUsersList({ usersEl, userState });

                if (focusedChatUnit) {
                    const focusedUsername = focusedChatUnit.querySelector(".receiver-name").textContent;
                    const newFocusedChatUnit = Array.from(usersEl.querySelectorAll(".chat-unit")).find(unit => {
                        return unit.querySelector(".receiver-name").textContent === focusedUsername;
                    });
                    if (newFocusedChatUnit) {
                        clearFocus(appEl);
                        newFocusedChatUnit.classList.add("focused");
                    }
                } else if (focusedPublicChannel) {
                    const newPublicChannelEl = appEl.querySelector(".public-channel");
                    if (newPublicChannelEl) {
                        clearFocus(appEl);
                        newPublicChannelEl.classList.add("focused");
                    }
                }
            })
            .catch(err => {
                setError(err.error);
                renderApp({ appEl, userState });
            });

        if (focusedChatUnit) {
            const focusedUsername = focusedChatUnit.querySelector(".receiver-name").textContent;
            const chatPair = createChatPair(userState.username, focusedUsername);
            fetchDmList(userState.username, focusedUsername, userState.dmLastUpdated[chatPair])
                .then(newMessages => {
                    setDmMsg(newMessages, chatPair);
                    renderDmMsgList({ msgEl, userState, chatPair });
                })
                .catch(err => {
                    setError(err.error);
                    renderApp({ appEl, userState });
                });
        } else if (focusedPublicChannel) {
            fetchPublicList(userState.pubLastUpdated)
                .then(newMessages => {
                    setPubMsg(newMessages);
                    renderPubMsgList({ msgEl, userState });
                })
                .catch(err => {
                    setError(err.error);
                    renderApp({ appEl, userState });
                });
        }
    }, 5000);
}

export function clearIntervalId() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}