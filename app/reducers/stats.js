import { LOOSE_GAME, RESTORE_STATS, WIN_GAME } from '../actions';

import randomWord from '../randomWord';

export default (state = { losses: 0, wins: 0 }, action) => {
  switch (action.type) {
    case LOOSE_GAME:
      return { ...state, losses: state.losses + 1 };
    case RESTORE_STATS:
      return { losses: action.losses, wins: action.wins }
    case WIN_GAME:
      return { ...state, wins: state.wins + 1 };
    default:
      return state;
  }
};
