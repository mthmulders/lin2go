import { START_GAME } from '../actions';
import startGame from './startGame';

export default (params) => {
  return (state, action) => {
    console.log("ACTION:", action);
    switch(action.type) {
      case START_GAME: return startGame(state, action); break;
      default        : return state;                    break;
    }
  };
};
