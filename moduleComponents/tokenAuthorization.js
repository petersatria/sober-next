import { getCookie } from "./cookie";

const token = () => {
    let token = ''
    let getUser = getCookie('userCookie');
    if(getUser === null){
        token = ''
    } else{
        let parseCookie = JSON.parse(getUser)
        token = parseCookie.token;
    }
    return token
}

export {token}