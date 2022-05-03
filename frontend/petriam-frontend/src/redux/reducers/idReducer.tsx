import { ID } from '../constants';
import { initialState } from '../initialState';

const idReducer = (state = initialState, action) => {
    switch (action.type) {
        case ID:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}
export default idReducer;