const publicMessages = [
    {
        sender: "Harry",
        time: "2024-11-08 10:00:25",
        content: "Good mornming!",
        timestamp: 1721298470071
    },
    {
        sender: "Draco",
        time: "2024-11-08 10:02:10",
        content: "You too.",
        timestamp: 1721298470072
    },
    {
        sender: "Yiwen",
        time: "2024-11-08 10:10:35",
        content: "Bad news: Yesterday was Thursday bu I forgot to buy F4.",
        timestamp: 1721298470073
    },
    {
        sender: "Draco",
        time: "2024-11-09 10:15:35",
        content: "It's a cold day.",
        timestamp: 1731301057638
    }
];

function addPublicMessage(sender, content) {
    const time = getTime();
    const timestamp = Date.now();
    publicMessages.push({ sender, time, content, timestamp });
}

function getNewPublicMessages(lastUpdated) {
    return publicMessages.filter(msg => msg.timestamp >= lastUpdated);
}

function getTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}

const dmMessages = {
    "Draco_Harry": [
        {
            sender: "Harry",
            time: "2024-11-08 11:24:25",
            content: "Have you finished project2?",
            timestamp: 1
        },
        {
            sender: "Draco",
            time: "2024-11-08 11:25:25",
            content: "Not yet.",
            timestamp: 2
        },
    ],
    "Harry_Yiwen": [
        {
            sender: "Harry",
            time: "2024-11-08 13:46:10",
            content: "Would you like to have some mochinuts?",
            timestamp: 1
        },
        {
            sender: "Yiwen",
            time: "2024-11-08 13:49:16",
            content: "Why not? I’m just about to head out.",
            timestamp: 2
        },
        {
            sender: "Harry",
            time: "2024-11-08 13:50:16",
            content: "See you in the lobby.",
            timestamp: 3
        },
    ]
}

function addDmMessage(chatPair, sender, content) {
    if (!dmMessages[chatPair]) {
        dmMessages[chatPair] = [];
    }
    const timestamp = Date.now();
    const time = getTime();
    dmMessages[chatPair].push({ sender, time, content, timestamp });
}

function createChatPair(user1, user2) {
    const chatPair = [user1, user2].sort().join("_");
    return chatPair
}

function getNewDmMessages(chatPair, lastUpdated) {
    if (!dmMessages[chatPair]) {
        return [];
    }
    return dmMessages[chatPair].filter(msg => msg.timestamp > lastUpdated);
}

const messages = {
    publicMessages,
    addPublicMessage,
    getNewPublicMessages,
    dmMessages,
    addDmMessage,
    createChatPair,
    getNewDmMessages
}

module.exports = messages;