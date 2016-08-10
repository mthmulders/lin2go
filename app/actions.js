const CANCEL_GAME = 'CANCEL_GAME';
const START_GAME = 'START_GAME';

const cancelGame = () => {
  return { type: CANCEL_GAME };
}

const startGame = () => {
  return { type: START_GAME };
};

export {
  CANCEL_GAME,
  START_GAME,
  cancelGame,
  startGame
};
