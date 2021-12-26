import { combineReducers } from 'redux';
import tokenReducer from '../reducers/tokenReducer';

export const rootReducer = combineReducers({ 
    token: tokenReducer 
});
