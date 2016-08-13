const ADD_LETTER_TO_GUESS = 'ADD_LETTER_TO_GUESS';
const CANCEL_GAME = 'CANCEL_GAME';
const HIDE_STATS = 'HIDE_STATS';
const SHOW_STATS = 'SHOW_STATS';
const START_GAME = 'START_GAME';

const addLetterToGuess = (letter) => {
  return { type: ADD_LETTER_TO_GUESS, letter: letter };
};
const cancelGame = () => {
  return { type: CANCEL_GAME };
};
const hideStats = () => {
  return { type: HIDE_STATS };
}
const showStats = () => {
  return { type: SHOW_STATS };
};
const startGame = () => {
  return { type: START_GAME };
};

export {
  ADD_LETTER_TO_GUESS,
  CANCEL_GAME,
  HIDE_STATS,
  SHOW_STATS,
  START_GAME,
  addLetterToGuess,
  cancelGame,
  hideStats,
  showStats,
  startGame
};
