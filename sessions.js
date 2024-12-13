const uuid = require('crypto').randomUUID;

const sessionsList = {};

function addSession(username) {
    const sid = uuid();
    sessionsList[sid] = { username };
    return sid;
};

function deleteSession(sid) {
    delete sessionsList[sid];
};

function getSessionUsername(sid) {
    if (sid && sessionsList[sid]) {
        return sessionsList[sid].username;
    }
    return undefined;
}

const sessions = {
    sessionsList,
    addSession,
    deleteSession,
    getSessionUsername
}

module.exports = sessions;