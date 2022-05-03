import { combineReducers } from 'redux';
import tokenReducer from '../reducers/tokenReducer';
import idReducer from '../reducers/idReducer';

export const rootReducer = combineReducers({ 
    token: tokenReducer,
    id: idReducer
});
