import axios from 'axios'
import {
    BASE, 
    LOCAL,
    USER_PATH,
    AUTH_SIGNUP_PATH,
    AUTH_LOGIN_PATH,
    HOSTS_FILTER_PATH,
    MESSAGE_PATH,
    CONVERSATION_PATH,
    BECOME_HOST_PATH,
    CONTRACTS_PATH,
    USERS_PATH
} from './ApiConstants'

export async function createConversation(token: string, userId: string) {
    let body = {
        "conversation": {
            "hostUserId": userId
        }
    }
    let result = {};

    await axios
    .post(BASE+USER_PATH+CONVERSATION_PATH,
        body, 
        { headers: { Authorization: "Bearer " + token }
    })
    .then((response) => {
        result = response.data;
        console.log("createConversation", result);
    })
    .catch(error => {
        console.log(error);
    })

    return result;
}

export async function createContract(token: string, hostId: string, pets: Array<string>, startDate: string, endDate: string) {
    let result = {};

    let contract = {
        "contract": {
            "hostId": hostId,
            "pets": pets,
            "startDate": startDate,
            "endDate": endDate
        }
    } 

    await axios
        .post(BASE+USER_PATH+CONTRACTS_PATH,
            contract, 
            { headers: { Authorization: "Bearer " + token }
        })
        .then((response) => {
            result = response.data;
        })
        .catch(error => {
            console.log(error);
        })

        return result;
}

export async function updateContractStatus(token: string, contractId: string, status: string){
    let result = {};

    let update = {
        "contract": {
            "_id": contractId,
            "status": status
        }
    }

    await axios
        .put(BASE+USER_PATH+CONTRACTS_PATH, update,
        { headers: { Authorization: "Bearer " + token }
        })
        .then((response) => {
            result = response.data;
        })
        .catch(error => {
            console.log(error);
        });

    return result;
}

export async function getUserName(token: string, userId: string) {
    let result = {};

    await axios
        .get(BASE+USERS_PATH+userId, {
            headers: { Authorization: "bearer " + token }
        })
        .then((response) => {
            result = response.data;
        })
        .catch(error => {
            console.log(error);
        })

    return result;
}

export async function getContracts(token: string) {
    let result = [];

    await axios
        .get(BASE+USER_PATH+CONTRACTS_PATH, {
            headers: { Authorization: "bearer " + token }
        })
        .then((response) => {
            result = response.data;
        })
        .catch(error => {
            console.log(error);
        })

    return result;
}

export async function getHostsFiltered(longitude: number, latitude: number, radius: number, token: string){

    let result = {}

    const app = (baseUrl: string, extraUrl?: string) => {
        return axios.create({
            baseURL: baseUrl + extraUrl,
            headers: { Authorization: "bearer " + token }
        })
    } 

    await app(BASE, HOSTS_FILTER_PATH)
        .get(BASE+HOSTS_FILTER_PATH, {
            params: { 
                longitude: longitude,
                latitude: latitude,
                radius: radius,
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

export async function getHostsWithFilters(price: number, petType: string, longitude: number, latitude: number, radius: number, token: string){
    let result = {}

    const app = (baseUrl: string, extraUrl?: string) => {
        return axios.create({
            baseURL: baseUrl + extraUrl,
            headers: { Authorization: "bearer " + token }
        })
    } 

    await app(BASE, HOSTS_FILTER_PATH)
        .get(BASE+HOSTS_FILTER_PATH, {
            params: { 
                longitude: longitude,
                latitude: latitude,
                radius: radius,
                price: price,
                petType: petType
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

export async function signUpNewUser(username: string,userSurname:string, email: string, password: string): Promise<boolean>{
    let result: boolean = false;

    await axios
        .post(BASE+AUTH_SIGNUP_PATH, {
            name: username,
            surname:userSurname,
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
        .post(BASE+AUTH_LOGIN_PATH, {
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
    console.log(BASE+USER_PATH+CONVERSATION_PATH);

    await axios
        .get(BASE+USER_PATH+CONVERSATION_PATH, {
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

export async function sendMessage(message: string, token: string, receiverId: string): Promise<boolean>{
    let result: boolean = false;
    console.log(BASE+USER_PATH+MESSAGE_PATH);

    let messageBody = {
        "receiverId": receiverId,
        "content": message
    }

    await axios
        .post(BASE+USER_PATH+MESSAGE_PATH, {
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
    console.log("Aekls: " + BASE+USER_PATH+MESSAGE_PATH+"/"+conversationId);

    await axios
        .get(BASE+USER_PATH+MESSAGE_PATH+"/"+conversationId, {
            headers: { Authorization: "bearer " + token }
        })
        .then((response) => {
            result = response.data;
            console.log("Buradan" + JSON.stringify(result));
        })
        .catch(error => {
            console.log(error);
        })

    return result;
}

export async function becomeHost(token:string, userId:string, tc:string, aboutMe:string, acceptedPets:string[], criminalRecord:string, address:string): Promise<any>{
    let result: boolean = false;

    let body = {
        userId:userId,
        tc:tc,
        aboutMe:aboutMe,
        acceptedPets:acceptedPets,
        criminalRecord:criminalRecord,
        address:address
    }
    
    await axios
        .post(BASE+USER_PATH+BECOME_HOST_PATH, {
            hostApplication:body
        },{
            headers: { Authorization: "bearer " + token },
        })
        .then((response) => {
            result = true;
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.response.data.error);

            if(error.response.data.error === "User already is a host"){
                result = error.response.data.error.toString();
            }
        })

        return result;
}

export async function getCurrentUserInfo(token:string):Promise<any>{
    let result;

    await axios
    .get(BASE+USER_PATH, {
        headers: { Authorization: "bearer " + token }
    })
    .then((response) => {
        result = response.data;
    })
    .catch(error => {
        console.log(error.response.data.error);

        if(error.response.data.error === "User already is a host"){
            result = error.response.data.error.toString();
        }
    })
    
    return result;
}

export async function getHostApplicationInfo(token:string):Promise<any>{
    let result:any = false;

    await axios
        .get(LOCAL+USER_PATH+BECOME_HOST_PATH, {
            headers: { Authorization: "bearer " + token }
        })
        .then((response) => {
            result = response.data;
        })
        .catch(error => {
            console.log(error);
        })
        
        if(result === "No Active host Application"){
            return false;
        }else{
            return true;
        }
}