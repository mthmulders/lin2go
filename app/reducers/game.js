import {
  ADD_LETTER_TO_GUESS,
  CANCEL_GAME,
  LOOSE_GAME,
  PREFILL_GUESS,
  RATE_ATTEMPT,
  RESET_GUESS,
  START_GAME,
  WIN_GAME
} from '../actions';

import randomWord from '../randomWord';
import wordExists from '../wordExists';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_LETTER_TO_GUESS: {
      const guess = state.guess + action.letter;
      if (guess.length === 5) {
        if (wordExists(guess)) {
          const attempt = { word: guess.toUpperCase(), score: new Array(5) };
          const attempts = [...state.attempts, attempt];
          return { ...state, attempts, guess, invalidWord: false };
        } else {
          return { ...state, invalidWord: true };
        }
      } else {
        return { ...state, guess, invalidWord: false };
      }
    }
    case CANCEL_GAME: {
      return { };
    }
    case LOOSE_GAME: {
      return { ...state, lost: true, won: false };
    }
    case PREFILL_GUESS: {
      const prefill = state.prefill.slice(0);
      state.attempts.forEach((attempt) => {
        attempt.score.forEach((score, idx) => {
          if (score === 2 && !prefill[idx]) {
            prefill[idx] = attempt.word[idx];
          }
        });
      });
      return { ...state, prefill }
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
      const targetWord = randomWord().toUpperCase();
      const prefill = new Array(5).fill(undefined);
      const idx = Math.floor((Math.random() * 5));
      prefill[idx] = targetWord[idx];
      return {
        attempts: [],
        guess: '',
        prefill: prefill,
        targetWord: targetWord
      };
    }
    case WIN_GAME: {
      return { ...state, lost: false, won: true };
    }
    default: {
      return state;
    }
  }
};
