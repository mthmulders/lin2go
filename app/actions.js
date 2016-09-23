export const ADD_LETTER_TO_GUESS = 'ADD_LETTER_TO_GUESS';
export const CANCEL_GAME = 'CANCEL_GAME';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const EVAL_GAME_END = 'EVAL_GAME_END';
export const HIDE_STATS = 'HIDE_STATS';
export const INVALID_WORD = 'INVALID_WORD';
export const LOOSE_GAME = 'LOOSE_GAME';
export const PREFILL_GUESS = 'PREFILL_GUESS';
export const RATE_LETTER = 'RATE_LETTER';
export const RESET_GUESS = 'RESET_GUESS';
export const RESTORE_STATS = 'RESTORE_STATS';
export const SHOW_STATS = 'SHOW_STATS';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const START_GAME = 'START_GAME';
export const WIN_GAME = 'WIN_GAME';

export const addLetterToGuess = (letter) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_LETTER_TO_GUESS, letter: letter });
    const guess = getState().game.guess;
    if (getState().game.invalidWord) {
      dispatch(resetGuess());
      dispatch(invalidWord());
    } else if (guess.length === 5) {
      dispatch(resetGuess());
      dispatch(rateLetter(0));
    }
  };
};
export const cancelGame = () => {
  return { type: CANCEL_GAME };
};
export const clearMessage = () => {
  return { type: CLEAR_MESSAGE };
};
export const evalGameEnd = () => {
  return (dispatch, getState) => {
    const attempts = getState().game.attempts;
    const lastAttempt = attempts[attempts.length - 1];
    const lastScore = lastAttempt.score.reduce((acc, cur) => acc + cur, 0);

    if (lastScore === 10) {
      dispatch(winGame());
    } else if (attempts.length === 5) {
      dispatch(looseGame());
    }
  };
};
export const hideStats = () => {
  return { type: HIDE_STATS };
};
export const invalidWord = () => {
  return (dispatch, getState) => {
    dispatch(showMessage('This word does not exist. Try again...'))
  };
};
export const looseGame = () => {
  return { type: LOOSE_GAME };
};
export const prefillGuess = () => {
  return { type: PREFILL_GUESS };
};
export const rateLetter = (index) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({ type: RATE_LETTER, index });
        if (index <= 3) {
          dispatch(rateLetter(index + 1));
        } else {
          dispatch(evalGameEnd());
          dispatch(prefillGuess());
        }
        resolve();
      }, 250);
    });
  };
};
export const resetGuess = () => {
  return { type: RESET_GUESS };
};
export const restoreStats = (losses, wins) => {
  return { type: RESTORE_STATS, losses, wins };
};
export const showStats = () => {
  return { type: SHOW_STATS };
};
export const showMessage = (message) => {
  return { type: SHOW_MESSAGE, message };
};
export const startGame = () => {
  return { type: START_GAME };
};
export const winGame = () => {
  return { type: WIN_GAME };
}
