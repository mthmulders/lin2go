import { combineReducers } from 'redux';

import { START_GAME } from '../actions';
import startGame from './startGame';

export default combineReducers({
  startGame
});
