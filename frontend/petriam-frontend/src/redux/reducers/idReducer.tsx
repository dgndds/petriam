import { ID } from '../constants';
import { initialState } from '../initialState';

const idReducer = (state = initialState.id, action) => {
    switch (action.type) {
        case ID:
            return {
                id: action.payload,
            };
        default:
            return state;
    }
}
export default idReducer;