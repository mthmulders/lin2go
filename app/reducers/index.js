import { combineReducers } from 'redux';

import { CANCEL_GAME, START_GAME } from '../actions';
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
      return { ...state, stats: { losses: currentLosses + 1 }, game: undefined };
    default:
      return state;
  }
};
