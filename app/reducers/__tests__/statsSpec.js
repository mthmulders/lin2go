jest.unmock('../../actions');
jest.unmock('../stats');

import { cancelGame, looseGame, winGame }  from '../../actions';
import reducer from '../stats';

const initalState = { losses: 1, wins: 3 };

describe('The \'CANCEL_GAME\' action', () => {
  it('should increment the number of losses with 1', () => {
    // Arrange
    const action = cancelGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.losses).toBe(2);
  });

  it('should keep the number of wins unchanged', () => {
    // Arrange
    const action = cancelGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.wins).toBe(3);
  });
});

describe('The \'LOOSE_GAME\' action', () => {
  it('should increment the number of losses with 1', () => {
    // Arrange
    const action = looseGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.losses).toBe(2);
  });

  it('should keep the number of wins unchanged', () => {
    // Arrange
    const action = looseGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.wins).toBe(3);
  });
});

describe('The \'WIN_GAME\' action', () => {
  it('should increment the number of wins with 1', () => {
    // Arrange
    const action = winGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.wins).toBe(4);
  });

  it('should keep the number of losses unchanged', () => {
    // Arrange
    const action = winGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.losses).toBe(1);
  });
});
