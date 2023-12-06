import { onLogin } from "../store";

export const SaveLocalStorage = (data, dispatch) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', new Date().getTime() );
    dispatch( onLogin({name: data.name, uid: data.uid}) );

}
