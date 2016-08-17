import { INCREASE_WINS, INCREASE_LOSSES, CANCEL_GAME } from '../actions';

import randomWord from '../randomWord';

export default (state = { losses: 0, wins: 0 }, action) => {
  switch (action.type) {
    case CANCEL_GAME:
      return { ...state, losses: state.losses + 1 };
    default:
      return state;
  }
};
