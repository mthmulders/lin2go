import { combineReducers } from 'redux';

import { CANCEL_GAME, HIDE_STATS, SHOW_STATS, START_GAME } from '../actions';
import randomWord from '../randomWord';

// If we want to persist the game stats, we can use RN AsyncStorage
// http://facebook.github.io/react-native/docs/asyncstorage.html#content

export default (state, action) => {
  switch (action.type) {
    case START_GAME:
      const game = { targetWord: randomWord() };
      return { ...state, game };
    case CANCEL_GAME:
      const currentLosses = state.stats.losses;
      const stats = { ...state.stats, losses: currentLosses + 1 };
      return { ...state, stats: stats, game: undefined };
    case SHOW_STATS:
      return { ...state, showStats: true };
    case HIDE_STATS:
      return { ...state, showStats: false };
    default:
      return state;
  }
};
