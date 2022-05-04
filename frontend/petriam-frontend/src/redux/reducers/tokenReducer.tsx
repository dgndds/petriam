import { TOKEN } from '../constants';
import { initialState } from '../initialState';

const tokenReducer = (state = initialState.token, action) => {
    switch (action.type) {
        case TOKEN:
            return {
                token: action.payload
            };
        default:
            return state;
    }
}
export default tokenReducer;