import { TOKEN } from '../constants';
import { initialState } from '../initialState';

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}
export default tokenReducer;