import {
  ADD_LETTER_TO_GUESS,
  CANCEL_GAME,
  RATE_ATTEMPT,
  RESET_GUESS,
  START_GAME
} from '../actions';

import randomWord from '../randomWord';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_LETTER_TO_GUESS: {
      const guess = state.guess + action.letter;
      if (guess.length === 5) {
        const attempt = { word: guess.toUpperCase() };
        const attempts = [...state.attempts, attempt];
        return { ...state, attempts, guess };
      } else {
        return { ...state, guess };
      }
    }
    case CANCEL_GAME: {
      return { };
    }
    case RATE_ATTEMPT: {
      const attempt = state.attempts[state.attempts.length - 1];
      console.log('Should now rate letter ' + action.index + ' of attempt ' + attempt.word);
      return state;
    }
    case RESET_GUESS: {
      return { ...state, guess: '' }
    }
    case START_GAME: {
      const targetWord = randomWord();
      return { attempts: [], guess: '',  targetWord: targetWord };
    }
    default: {
      return state;
    }
  }
};
