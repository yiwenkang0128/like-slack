export function fetchSession() {
    const lastUpdated = 0;
    return fetch(`/api/v1/session?lastUpdated=${lastUpdated}`, {
        method: 'GET'
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));

            }
            return response.json();
        })
}


export function fetchLogin(username, lastUpdated) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username, lastUpdated })
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })

}


export function fetchLogout() {
    return fetch('/api/v1/session', {
        method: 'DELETE'
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err))
            }
            return response.json();
        })
}

export function fetchPublicList(lastUpdated) {
    return fetch(`/api/v1/publicMessages?lastUpdated=${lastUpdated}`, {
        method: 'GET'
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err))
            }
            return response.json();
        })
}

export function fetchAddPublicMsg(content, lastUpdated) {

    return fetch('/api/v1/publicMessages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            content,
            lastUpdated
        })
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err))

            }
            return response.json();
        })
}

export function fetchDmList(sender, receiver, lastUpdated) {

    return fetch(`/api/v1/dmMessages?sender=${sender}&receiver=${receiver}&lastUpdated=${lastUpdated}`, {
        method: 'GET',

    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err))

            }
            return response.json();
        })
}

export function fetchAddDmMessage(sender, receiver, content, lastUpdated) {
    return fetch('/api/v1/dmMessages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            sender, receiver, content, lastUpdated
        })
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err))

            }
            return response.json();
        })
}

export function fetchUsersList() {

    return fetch('/api/v1/users', {
        method: 'GET',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err))

            }
            return response.json();
        })
}