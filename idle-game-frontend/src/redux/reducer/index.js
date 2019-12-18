import { combineReducers } from 'redux';
import authReducer from './authReducer';
import handleMessageReducer from './handleMessageReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    authUser: authReducer,
    message: handleMessageReducer,
    modal: modalReducer
});