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

export async function signUpNewUser(username: string, email: string, password: string): Promise<boolean>{
    let result: boolean = false;

    await app(BASE, AUTH_SIGNUP_PATH)
        .post(BASE+AUTH_SIGNUP_PATH, {
            username: username,
            email: email,
            password: password
        })
        .then((response) => {
            result = true;
            console.log(response.data.token)
        })
        .catch(error => {
            console.log(error);
        })

        return result;
}

export async function loginUser(email: string, password: string): Promise<string>{
    let token = "";

    await app(BASE, AUTH_LOGIN_PATH)
        .post(BASE+AUTH_LOGIN_PATH, {
            email: email,
            password: password
        })
        .then((response) => {
            token = response.data.token;
        })
        .catch(error => {
            console.log(error);
            token = "-1";
        })

    return token;
}