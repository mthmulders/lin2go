export const ADD_LETTER_TO_GUESS = 'ADD_LETTER_TO_GUESS';
export const CANCEL_GAME = 'CANCEL_GAME';
export const HIDE_STATS = 'HIDE_STATS';
export const INCREASE_LOSSES = 'INCREASE_LOSSES'
export const INCREASE_WINS = 'INCREASE_WINS';
export const SHOW_STATS = 'SHOW_STATS';
export const START_GAME = 'START_GAME';

export const addLetterToGuess = (letter) => {
  return { type: ADD_LETTER_TO_GUESS, letter: letter };
};
export const cancelGame = () => {
  return { type: CANCEL_GAME };
};
export const hideStats = () => {
  return { type: HIDE_STATS };
}
export const increaseLosses = () => {
  return { type: INCREASE_LOSSES };
}
export const increaseWins = () => {
  return { type: INCREASE_WINS };
}
export const showStats = () => {
  return { type: SHOW_STATS };
};
export const startGame = () => {
  return { type: START_GAME };
};
