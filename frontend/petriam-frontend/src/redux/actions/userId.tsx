import { 
    ID
 } from '../constants';

export function changeId(id: string) {
    return {
        type: ID,
        payload: id
    }
}