import Cookies from 'js-cookie';

const getCookie=(key:string)=>{
    return Cookies.get(key);
}

export const removeCookie=(key:string)=>{
    Cookies.remove(key)
}

export default getCookie;