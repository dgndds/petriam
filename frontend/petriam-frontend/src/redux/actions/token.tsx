import { 
    TOKEN,
    ID
 } from '../constants';

export function changeToken(token: string) {
    return {
        type: TOKEN,
        payload: token
    }
}

export function changeId(id: string) {
    return {
        type: ID,
        payload: id
    }
}