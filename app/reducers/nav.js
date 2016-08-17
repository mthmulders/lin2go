import {
  HIDE_STATS,
  SHOW_STATS
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case HIDE_STATS:
      return { ...state, showStats: false };
    case SHOW_STATS:
      return { ...state, showStats: true };
    default:
      return state;
  }
};
