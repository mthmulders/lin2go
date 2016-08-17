import { combineReducers } from 'redux';

import {
  ADD_LETTER_TO_GUESS,
  CANCEL_GAME,
  HIDE_STATS,
  SHOW_STATS,
  START_GAME
} from '../actions';

import game from './game';
import nav from './nav';
import stats from './stats';

// If we want to persist the game stats, we can use RN AsyncStorage
// http://facebook.github.io/react-native/docs/asyncstorage.html#content

const reducer = combineReducers({
  game,
  nav,
  stats
});

export default reducer;
