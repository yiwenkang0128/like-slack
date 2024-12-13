export function renderApp({ appEl, userState }) {
    const html = `
    ${generateLoginHtml(userState)}
    `;
    appEl.innerHTML = html;
}
export function renderChat({ appEl, userState }) {
    if (userState.loginState) {
        const html = `
    ${generateUserBar(userState)}
    ` + `
    <div class="main">
    <div class="users-list">
    ` + `
    ${generateUsersList(userState)}
    ` + `
    </div>
    <div class="msg-board">
    <div class="msg-list">
    ` + `
    ${generatePubMsgList(userState)}
    `+ `</div>` + `
    ${generateSendBox(userState)}
    `+ `
    </div>
    </div>`;
        appEl.innerHTML = html;
    }

}

export function renderUsersList({ usersEl, userState }) {
    if (userState.loginState) {
        const html = `${generateUsersList(userState)}`;
        usersEl.innerHTML = html;
    }
}

export function renderPubMsgList({ msgEl, userState }) {
    if (userState.loginState) {
        const scrollPosition = msgEl.scrollTop;
        const html = `${generatePubMsgList(userState)}`;
        msgEl.scrollTop = scrollPosition;
        msgEl.innerHTML = html;
    }
}

export function renderDmMsgList({ msgEl, userState, chatPair }) {
    if (userState.loginState) {
        const messages = userState.newDmMessages[chatPair] || [];
        const html = messages.map(message => `
            <div class="message-unit">
                <div class="sender-avatar">${takeFirstLetter(message.sender)}</div>
                <div class="message-body">
                    <div class="sender-info">
                        <div class="sender-name">${message.sender}</div>
                        <div class="send-time">${message.time}</div>
                    </div>
                    <div class="message-content">${message.content}</div>
                </div>
            </div>
        `).join('');
        msgEl.innerHTML = html;
    }
}

function generateLoginHtml(userState) {
    if (userState.loginState) {
        return '';
    }
    if (userState.loginPending) {
        return `
        <div class="load-login">
            <p>Logging in......</p>
        </div>        
        `;
    }
    return `
        <form class="login-form">
            <input type="text" class="enter-username" name="username" placeholder="Please enter your username">
            <button type="submit" class="login-btn">Login</button>
            <small class="error-message">${userState.error}</small>
        </form>
    `;
}

function generateUserBar(userState) {
    if (userState.loginState) {
        return `
        <div class="user-bar">
        <div class="user-avatar">${takeFirstLetter(userState.username)}</div>
        <button class="logout-btn" title="Log out">
            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#ffffff"
                    stroke-width="1.5" stroke-linecap="round" />
                <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#ffffff" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        </div>`;
    }
    return '';
}

function takeFirstLetter(name) {
    const firstLetter = name.split(' ').map(word => word[0]).join('');
    return firstLetter;
}

function generateUsersList(userState) {
    if (!userState.loginState) {
        return '';
    }
    const publicChannelHtml = `
    <button class="public-channel focused">
        <div class="receiver-name"># Public channel</div>
    </button>
    `;

    const usersHtml = userState.usersList
        .filter(user => user !== userState.username)
        .map(user => `
            <button class="chat-unit">
                <div class="receiver-avatar">${takeFirstLetter(user)}</div>
                <div class="receiver-name">${user}</div>
            </button>    
        `).join('');

    const usersListHtml = `
        ${publicChannelHtml}
        ${usersHtml}
    `;

    return usersListHtml;
}

function getDivider() {
    return `
    <div class="divider">
        <span>History messages</span>
    </div>
    `;
}

function generatePubMsgList(userState) {
    if (!userState.loginState) {
        return '';
    }
    if (userState.chatPending) {
        return `
        <div class="load-chat">
            <p>Loading......</p>
        </div>
        `
    }
    const historyPubMsgList = userState.historyPublicMessages.map(message => `
                    <div class="message-unit">
                        <div class="sender-avatar">${takeFirstLetter(message.sender)}</div>
                        <div class="message-body">
                            <div class="sender-info">
                                <div class="sender-name">${message.sender}</div>
                                <div class="send-time">${message.time}</div>
                            </div>
                            <div class="message-content">${message.content}</div>
                        </div>
                    </div>
    `).join('');

    const newPubMsgList = userState.newPublicMessages.map(message => `
    <div class="message-unit">
        <div class="sender-avatar">${takeFirstLetter(message.sender)}</div>
        <div class="message-body">
            <div class="sender-info">
                <div class="sender-name">${message.sender}</div>
                <div class="send-time">${message.time}</div>
            </div>
            <div class="message-content">${message.content}</div>
        </div>
    </div>
`).join('');

    const pubMsgList = historyPubMsgList + getDivider() + newPubMsgList;
    return pubMsgList;


}

function generateSendBox(userState) {
    if (!userState.loginState) {
        return '';
    }
    return `
    <form class="send-box">
                    <input type="text" class="enter-msg" name="content" placeholder="Please enter your message."
                        required>
                    <button class="send-msg">

                        <svg width="45px" height="45px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.1391 2.95907L7.10914 5.95907C1.03914 7.98907 1.03914 11.2991 7.10914 13.3191L9.78914 14.2091L10.6791 16.8891C12.6991 22.9591 16.0191 22.9591 18.0391 16.8891L21.0491 7.86907C22.3891 3.81907 20.1891 1.60907 16.1391 2.95907ZM16.4591 8.33907L12.6591 12.1591C12.5091 12.3091 12.3191 12.3791 12.1291 12.3791C11.9391 12.3791 11.7491 12.3091 11.5991 12.1591C11.3091 11.8691 11.3091 11.3891 11.5991 11.0991L15.3991 7.27907C15.6891 6.98907 16.1691 6.98907 16.4591 7.27907C16.7491 7.56907 16.7491 8.04907 16.4591 8.33907Z" />
                        </svg>
                    </button>
                </form>
    `;
}