import { combineReducers } from 'redux';

import game from './game';
import messages from './messages';
import nav from './nav';
import stats from './stats';

// If we want to persist the game stats, we can use RN AsyncStorage
// http://facebook.github.io/react-native/docs/asyncstorage.html#content

const reducer = combineReducers({
  game,
  messages,
  nav,
  stats
});

export default reducer;
