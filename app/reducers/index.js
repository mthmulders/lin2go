import { combineReducers } from 'redux';

import { CANCEL_GAME, START_GAME } from '../actions';
import randomWord from '../randomWord';

// If we want to persist the game stats, we can use RN AsyncStorage
// http://facebook.github.io/react-native/docs/asyncstorage.html#content

export default (state, action) => {
  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state, {
        game: {
          targetWord: randomWord()
        }
      });
    case CANCEL_GAME:
      const currentLosses = state.stats.losses;
      return Object.assign({}, state, {
        game: undefined,
        stats: {
          losses: currentLosses + 1
        }
      });
    default:
      return state;
  }
};
