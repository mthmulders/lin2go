export const ADD_LETTER_TO_GUESS = 'ADD_LETTER_TO_GUESS';
export const CANCEL_GAME = 'CANCEL_GAME';
export const HIDE_STATS = 'HIDE_STATS';
export const RATE_ATTEMPT = 'RATE_ATTEMPT';
export const RESET_GUESS = 'RESET_GUESS';
export const SHOW_STATS = 'SHOW_STATS';
export const START_GAME = 'START_GAME';

export const addLetterToGuess = (letter) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_LETTER_TO_GUESS, letter: letter });
    const guess = getState().game.guess;
    if (guess.length === 5) {
      dispatch(resetGuess());
      dispatch(rateAttempt(0));
    }
  };
};
export const cancelGame = () => {
  return { type: CANCEL_GAME };
};
export const hideStats = () => {
  return { type: HIDE_STATS };
}
export const rateAttempt = (index) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({ type: RATE_ATTEMPT, index });
        if (index <= 3) {
          dispatch(rateAttempt(index + 1));
        }
        resolve();
      }, 250);
    });
  };
};
export const resetGuess = () => {
  return { type: RESET_GUESS };
}
export const showStats = () => {
  return { type: SHOW_STATS };
};
export const startGame = () => {
  return { type: START_GAME };
};
