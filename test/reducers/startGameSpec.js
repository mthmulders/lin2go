jest.unmock('../../app/reducers/startGame');

const START_GAME = require('../../app/actions').START_GAME;
const startGame = require('../../app/reducers/startGame').default;

describe('startGame', () => {
  it('should add a game to the app state', () => {
      // Arrange
      const initalState = {};

      // Act
      const state = startGame(initalState, START_GAME);

      // Assert
      expect(state.game).toBeDefined();
  });
});
