import { FETCH_TWEETS } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_TWEETS:
      return action.payload || false;
    default:
      return state;
  }
}
