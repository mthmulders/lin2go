import {
  ADD_LETTER_TO_GUESS,
  CANCEL_GAME,
  START_GAME
} from '../actions';

import randomWord from '../randomWord';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_LETTER_TO_GUESS:
      return { ...state, currentGuess: state.currentGuess + action.letter };
    case CANCEL_GAME:
      return { };
    case START_GAME:
      const targetWord = randomWord();
      return { targetWord: targetWord, currentGuess: '' };
    default:
      return state;
  }
};
