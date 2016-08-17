jest.unmock('../../actions');
jest.unmock('../stats');

import { cancelGame }  from '../../actions';
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
