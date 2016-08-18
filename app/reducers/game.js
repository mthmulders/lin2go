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
      const newAttempt =  guess.length === 5;
      const attempts = newAttempt ? [...state.attempts, guess.toUpperCase()] : state.attempts;
      return { ...state, attempts, guess: newAttempt ? '' : guess };
    case CANCEL_GAME:
      return { };
    case START_GAME:
      const targetWord = randomWord();
      return { attempts: [], guess: '',  targetWord: targetWord };
    default:
      return state;
  }
};
