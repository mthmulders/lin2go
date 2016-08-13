import { combineReducers } from 'redux';

import {
  ADD_LETTER_TO_GUESS,
  CANCEL_GAME,
  HIDE_STATS,
  SHOW_STATS,
  START_GAME
} from '../actions';
import randomWord from '../randomWord';

// If we want to persist the game stats, we can use RN AsyncStorage
// http://facebook.github.io/react-native/docs/asyncstorage.html#content

export default (state, action) => {
  switch (action.type) {
    case ADD_LETTER_TO_GUESS:
      return {
        ...state,
        game: {
          ...state.game,
          currentGuess: state.game.currentGuess + action.letter
        }
      };
    case CANCEL_GAME:
      return {
        ...state,
        stats: {
          ...state.stats,
          losses: state.stats.losses + 1
        },
        game: undefined
      };
    case HIDE_STATS:
      return {
        ...state,
        showStats: false
      };
    case SHOW_STATS:
      return {
        ...state,
        showStats: true
      };
    case START_GAME:
      return {
        ...state,
        game: { targetWord: randomWord(), currentGuess: '' }
      };
    default:
      return state;
  }
};
