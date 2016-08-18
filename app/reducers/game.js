import {
  ADD_LETTER_TO_GUESS,
  CANCEL_GAME,
  START_GAME
} from '../actions';

import randomWord from '../randomWord';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_LETTER_TO_GUESS:
      const guess = state.guess + action.letter;
      if (guess.length === 5) {
        const attempt = { word: guess.toUpperCase() };
        const attempts = [...state.attempts, attempt];
        return { ...state, attempts, guess: '' };
      } else {
        return { ...state, guess };
      }
    case CANCEL_GAME:
      return { };
    case START_GAME:
      const targetWord = randomWord();
      return { attempts: [], guess: '',  targetWord: targetWord };
    default:
      return state;
  }
};
