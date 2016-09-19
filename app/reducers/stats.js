import { LOOSE_GAME, WIN_GAME } from '../actions';

import randomWord from '../randomWord';

export default (state = { losses: 0, wins: 0 }, action) => {
  switch (action.type) {
    case LOOSE_GAME:
      return { ...state, losses: state.losses + 1 };
    case WIN_GAME:
      return { ...state, wins: state.wins + 1 };
    default:
      return state;
  }
};
