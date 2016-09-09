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
        const attempt = { word: guess.toUpperCase(), score: new Array(5) };
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
      const target = state.targetWord;
      const attempt = state.attempts[state.attempts.length - 1];

      // Build new score so the original state is not mutated.
      const score = Array.from(attempt.score);
      if (target[action.index] === attempt.word[action.index]) {
        score[action.index] = 2;
      } else if (target.indexOf(attempt.word[action.index]) !== -1) {
        score[action.index] = 1;
      } else {
        score[action.index] = 0;
      }

      // Build new array so the original state is not mutated.
      const attempts = Array.from(state.attempts)
      attempts[state.attempts.length - 1] = { ...attempt, score };

      return { ...state, attempts };
    }
    case RESET_GUESS: {
      return { ...state, guess: '' }
    }
    case START_GAME: {
      const targetWord = randomWord();
      return { attempts: [], guess: '', targetWord: targetWord.toUpperCase() };
    }
    default: {
      return state;
    }
  }
};
