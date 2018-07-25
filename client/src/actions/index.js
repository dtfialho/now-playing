import axios from 'axios';
import { FETCH_USER, FETCH_FRIENDS, FETCH_TWEETS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchFriends = () => async dispatch => {
  const res = await axios.get('/api/user_friends');

  dispatch({ type: FETCH_FRIENDS, payload: res.data });
};

export const fetchTweets = (lat, long) => async dispatch => {
  const res = await axios.get('/api/tweets', {lat, long});

  dispatch({ type: FETCH_TWEETS, payload: res.data });
};
