import axios from 'axios'
import {
    BASE, 
    USER_PATH,
    AUTH_SIGNUP_PATH,
    AUTH_LOGIN_PATH,
    HOSTS_FILTER_PATH
} from './ApiConstants'

export async function getHostsFiltered(longitude: number, latitude: number, radius: number, token: string){
    let result = {}

    const app = (baseUrl: string, extraUrl?: string) => {
        return axios.create({
            baseURL: baseUrl + extraUrl,
            headers: { Authorization: "bearer " + token }
        })
    } 
    console.log("bearer " + token);
    await app(BASE, HOSTS_FILTER_PATH)
        .get(BASE+HOSTS_FILTER_PATH, {
            params: { 
                longitude: longitude,
                latitude: latitude,
                radius: radius
            }
        })
        .then((response) => {
            result = response.data;
        })
        .catch((error) => {
            console.log(error);
        })

    return result;
}

export async function signUpNewUser(username: string, email: string, password: string): Promise<boolean>{
    let result: boolean = false;

    await axios
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

    await axios
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