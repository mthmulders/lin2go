import { cancelGame, startGame } from '../../app/actions';
import reducer from '../../app/reducers/';

describe('START_GAME', () => {
  it('should add a game to the app state', () => {
      // Arrange
      const initalState = {};
      const action = startGame();

      // Act
      const state = reducer(initalState, action);

      // Assert
      expect(state.game).toBeDefined();
  });
});


describe('CANCEL_GAME', () => {
  it('should remove the running game from the app state', () => {
    // Arrange
    const initalState = { game: {}, stats: { losses: 0 } };
    const action = cancelGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.game).toBeUndefined();
  });

  it('should increment the number of losses with 1', () => {
    // Arrange
    const initalState = { stats: { losses: 0 } };
    const action = cancelGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.stats.losses).toBe(1);
  });
});
