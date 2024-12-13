import { renderApp, renderChat } from "./view";
import { loadLogin, loadLoginFinish, setLogin, setLogout, setPubMsg, setPubUpdate, setUsersList, userState } from "./state"
import { addDmListener, addLoginListener, addLogoutListener, addSendListener, startPolling } from "./listener";
import { fetchSession } from "./services";


const appEl = document.querySelector(".bottom");
renderChat({ appEl, userState });
addLoginListener({ appEl, userState });
addDmListener({ appEl, userState });
addSendListener({ appEl, userState });
addLogoutListener({ appEl, userState });

fetchSession()
    .then((info) => {
        loadLogin();
        renderApp({ appEl, userState });
        setUsersList(info.userList);
        setPubMsg(info.newPublicMessages);
        setLogin(info.username);
        setPubUpdate();
        loadLoginFinish();
        renderChat({ appEl, userState });

        if (userState.loginState) {
            startPolling(appEl, userState);
        }
    })
    .catch(() => {
        setLogout();


        renderApp({ appEl, userState });

        const errorMessageEl = appEl.querySelector('.error-message');
        if (errorMessageEl) {
            errorMessageEl.style.display = 'block';
        }
    });
