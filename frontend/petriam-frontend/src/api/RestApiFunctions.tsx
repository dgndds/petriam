import axios from 'axios'
import {
    BASE, 
    USER_PATH,
    AUTH_SIGNUP_PATH,
    AUTH_LOGIN_PATH
} from './ApiConstants'

const app = (baseUrl: string, extraUrl?: string) => {
    return axios.create({
        baseURL: baseUrl + extraUrl
    })
} 

export function signUpNewUser(username: string, email: string, password: string): void{
    app(BASE, AUTH_SIGNUP_PATH)
        .post(BASE+AUTH_SIGNUP_PATH, {
            username: username,
            email: email,
            password: password
        })
        .then((response) => {
            
            console.log(response.data.token)
        })
        .catch(error => {
            console.log(error);
        })
}

export function loginUser(email: string, password: string): string{
    let token = "";

    app(BASE, AUTH_LOGIN_PATH)
        .post(BASE+AUTH_LOGIN_PATH, {
            email: email,
            password: password
        })
        .then((response) => {
            token = response.data.token;
            console.log(token);
            return token;
        })
        .catch(error => {
            console.log(error);
            return "-1";
        })
    
        return token;
}