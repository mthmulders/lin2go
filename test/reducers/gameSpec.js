import { startGame } from '../../app/actions';
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
