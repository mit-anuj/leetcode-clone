import { atom } from "recoil";

// const AuthModalState = {
//     login: 'login',
//     register: 'register',
//     forgot: 'forgot password'
// }

const initialAuthModalState = {
    isOpen:false ,
    type:'login'
}

export const authModalState = atom({
    key: 'authModalState',
    default: initialAuthModalState
})