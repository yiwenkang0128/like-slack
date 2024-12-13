const usersList = ["Harry", "Draco", "Yiwen"];

function addUser(username) {
    if (!usersList.includes(username)) {
        usersList.push(username);
    }
}

function isValid(username) {
    if (!username || typeof username !== 'string') {
        return false;
    }
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.length <= 20;
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}
function isPermitted(username) {
    return username !== 'dog';
}

const users = {
    usersList,
    addUser,
    isValid,
    isPermitted
}

module.exports = users;