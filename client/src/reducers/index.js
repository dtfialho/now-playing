import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tweetsReducer from './tweetsReducer';
import friendsReducer from './friendsReducer';

export default combineReducers({
  auth: authReducer,
  tweets: tweetsReducer,
  friends: friendsReducer
});
