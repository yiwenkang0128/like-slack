const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');
const messages = require('./messages');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());


app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUsername(sid) : '';
    if (username === '') {
    }
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const lastUpdated = req.query.lastUpdated || 0;
    const userList = users.usersList;
    const newPublicMessages = messages.getNewPublicMessages(lastUpdated);
    res.json({ username, userList, newPublicMessages });
});

app.post('/api/v1/session', (req, res) => {
    const { username, lastUpdated } = req.body;
    if (!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (!users.isPermitted(username)) {
        res.status(403).json({ error: 'auth-insufficient' });

        return;
    }


    const sid = sessions.addSession(username);
    users.addUser(username);
    const userList = users.usersList;
    const newPublicMessages = messages.getNewPublicMessages(lastUpdated);
    res.cookie('sid', sid);
    res.json({ userList, newPublicMessages });
});

app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUsername(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        sessions.deleteSession(sid);
    }

    res.json({ wasLoggedIn: !!username });
})

app.get('/api/v1/publicMessages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUsername(sid) : '';

    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const lastUpdated = req.query.lastUpdated || 0;
    const newPublicMessages = messages.getNewPublicMessages(lastUpdated);
    res.json(newPublicMessages);
})

app.post('/api/v1/publicMessages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUsername(sid) : '';

    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { content, lastUpdated } = req.body;
    if (!content) {
        res.status(400).json({ error: 'content-missing' })
    }
    const validLastUpdated = lastUpdated ? lastUpdated : 0;
    messages.addPublicMessage(username, content);
    const newPublicMessages = messages.getNewPublicMessages(validLastUpdated);
    res.json(newPublicMessages);
})


app.get('/api/v1/dmMessages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUsername(sid) : '';

    if (!sid || !users.isValid(username)) {
        res.status(401), json({ error: 'auth-missing' });
        return;
    }

    const { sender, receiver, lastUpdated } = req.query;
    const chatPair = messages.createChatPair(sender, receiver);
    const validLastUpdated = lastUpdated ? lastUpdated : 0;

    const newDmMessages = messages.getNewDmMessages(chatPair, validLastUpdated);
    res.json(newDmMessages);
})

app.post('/api/v1/dmMessages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUsername(sid) : '';

    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { sender, receiver, content, lastUpdated } = req.body;
    const chatPair = messages.createChatPair(sender, receiver);
    if (!content) {
        res.status(400).json({ error: 'content-missing' });
        return;
    }

    messages.addDmMessage(chatPair, sender, content);
    const validLastUpdated = lastUpdated ? lastUpdated : 0;
    const newDmMessages = messages.getNewDmMessages(chatPair, validLastUpdated);

    res.json(newDmMessages);
})

app.get('/api/v1/users', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUsername(sid) : '';

    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const usersList = users.usersList;

    res.json(usersList);
})

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT} `))