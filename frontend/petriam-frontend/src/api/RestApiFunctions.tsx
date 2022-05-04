import axios from 'axios'
import {
    BASE, 
    LOCAL,
    USER_PATH,
    AUTH_SIGNUP_PATH,
    AUTH_LOGIN_PATH,
    HOSTS_FILTER_PATH,
    MESSAGE_PATH,
    CONVERSATION_PATH
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
    await app(LOCAL, HOSTS_FILTER_PATH)
        .get(LOCAL+HOSTS_FILTER_PATH, {
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
        .post(LOCAL+AUTH_SIGNUP_PATH, {
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

export async function loginUser(email: string, password: string): Promise<Object>{
    let token = "";
    let userId = "";

    await axios
        .post(LOCAL+AUTH_LOGIN_PATH, {
            email: email,
            password: password
        })
        .then((response) => {
            token = response.data.token;
            userId = response.data.userId;
        })
        .catch(error => {
            console.log(error);
            token, userId = "-1";
        })

    return {token: token, userId: userId};
}

export async function getConversations(token: string): Promise<any>{
    let result = {};
    console.log(LOCAL+USER_PATH+CONVERSATION_PATH);

    await axios
        .get(LOCAL+USER_PATH+CONVERSATION_PATH, {
            headers: { Authorization: "bearer " + token }
        })
        .then((response) => {
            result = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })

    return result;
}

export async function sendMessage(message: string, token: string): Promise<boolean>{
    let result: boolean = false;
    console.log(LOCAL+USER_PATH+MESSAGE_PATH);

    let messageBody = {
        "receiverId": "626dc689b023cc84e4f86936",
        "content": message
    }

    await axios
        .post(LOCAL+USER_PATH+MESSAGE_PATH, {
            message: messageBody
        }, {
            headers: { Authorization: "bearer " + token }
        })
        .then((response) => {
            result = true;
        })
        .catch(error => {
            console.log(error);
        })

    return result;
}

export async function getMessages(conversationId: string, token: string): Promise<any>{
    let result = {};
    console.log("Aekls: " + LOCAL+USER_PATH+MESSAGE_PATH+"/"+conversationId);

    await axios
        .get(LOCAL+USER_PATH+MESSAGE_PATH+"/"+conversationId, {
            headers: { Authorization: "bearer " + token }
        })
        .then((response) => {
            result = response.data;
            console.log("Buradan" + result);
        })
        .catch(error => {
            console.log(error);
        })

    return result;
}