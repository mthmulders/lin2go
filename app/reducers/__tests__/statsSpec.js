jest.unmock('../../actions');
jest.unmock('../stats');

import { cancelGame, LOOSE_GAME, restoreStats, WIN_GAME }  from '../../actions';
import reducer from '../stats';

const initialState = { losses: 1, wins: 3 };

describe('The \'LOOSE_GAME\' action', () => {
  it('should increment the number of losses with 1', () => {
    // Arrange
    const action = { type: LOOSE_GAME };

    // Act
    const state = reducer(initialState, action);

    // Assert
    expect(state.losses).toBe(2);
  });

  it('should keep the number of wins unchanged', () => {
    // Arrange
    const action = { type: LOOSE_GAME };

    // Act
    const state = reducer(initialState, action);

    // Assert
    expect(state.wins).toBe(3);
  });
});

describe('The \'WIN_GAME\' action', () => {
  it('should increment the number of wins with 1', () => {
    // Arrange
    const action = { type: WIN_GAME };

    // Act
    const state = reducer(initialState, action);

    // Assert
    expect(state.wins).toBe(4);
  });

  it('should keep the number of losses unchanged', () => {
    // Arrange
    const action = { type: WIN_GAME };

    // Act
    const state = reducer(initialState, action);

    // Assert
    expect(state.losses).toBe(1);
  });
});

describe('The \'RESTORE_STATS\' action', () => {
  it('should overwrite game stats with given values', () => {
    // Arrange
    const action = restoreStats(3, 4);

    // Act
    const state = reducer(initialState, action);

    // Assert
    expect(state.losses).toBe(3);
    expect(state.wins).toBe(4);
  });
});
