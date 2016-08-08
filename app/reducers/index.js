import { combineReducers } from 'redux';

import { START_GAME } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state, {
        game: { }
      });
    default:
      return state;
  }
};
