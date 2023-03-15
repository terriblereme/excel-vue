import router from '@/router';
import Cookies  from 'js-cookie';
import store from '@/store';
import {token_code} from '@/utils/config'
export function getToken(){
    let token = Cookies.get(token_code);
    if(token)
    return token
    else return false;
}
export function logout(){
        Cookies.remove(token_code);
        if(window.location.href.includes("mobile")){
            router.push('/mobile/login');
        }else{
             router.push('/admin/login');
        }
}
export function hasPermission(value){
    const btns  = store.getters.btns;
    return btns.indexOf(value)>-1;
}