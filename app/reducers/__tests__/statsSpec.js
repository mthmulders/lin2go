jest.unmock('../../actions');
jest.unmock('../stats');

import { increaseLosses, increaseWins }  from '../../actions';
import reducer from '../stats';

const initalState = { losses: 1, wins: 3 };

describe('The \'INCREASE_WINS\' action', () => {
  it('should increment the number of wins with 1', () => {
    // Arrange
    const action = increaseWins();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.wins).toBe(4);
  });

  it('should keep the number of losses unchanged', () => {
    // Arrange
    const action = increaseWins();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.losses).toBe(1);
  });

});

describe('The \'INCREASE_LOSSES\' action', () => {
  it('should increment the number of losses with 1', () => {
    // Arrange
    const action = increaseLosses();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.losses).toBe(2);
  });

  it('should keep the number of wins unchanged', () => {
    // Arrange
    const action = increaseLosses();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.wins).toBe(3);
  });
});
