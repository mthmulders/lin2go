import { INCREASE_WINS, INCREASE_LOSSES } from '../actions';

import randomWord from '../randomWord';

export default (state = { losses: 0, wins: 0 }, action) => {
  switch (action.type) {
    case INCREASE_WINS:
      return { ...state, wins: state.wins + 1 };
    case INCREASE_LOSSES:
      return { ...state, losses: state.losses + 1 };
    default:
      return state;
  }
};
