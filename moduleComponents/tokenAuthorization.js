import { getCookie } from "./cookie";

const token = () => {
    let token = ''
    let getUser = getCookie('userCookie');
    if (getUser === null) {
        token = null
    } else {
        let parseCookie = JSON.parse(getUser)
        token = parseCookie.token;
    }
    return token
}

export { token }