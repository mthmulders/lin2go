const CANCEL_GAME = 'CANCEL_GAME';
const HIDE_STATS = 'HIDE_STATS';
const SHOW_STATS = 'SHOW_STATS';
const START_GAME = 'START_GAME';

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
  CANCEL_GAME,
  HIDE_STATS,
  SHOW_STATS,
  START_GAME,
  cancelGame,
  hideStats,
  showStats,
  startGame
};
