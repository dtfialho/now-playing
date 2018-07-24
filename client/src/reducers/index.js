import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tweetsReducer from './tweetsReducer';

export default combineReducers({
  auth: authReducer,
  tweets: tweetsReducer
});
