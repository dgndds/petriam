import { TOKEN } from '../constants';

export function changeToken(token: string) {
    return {
        type: TOKEN,
        payload: token
    }
}