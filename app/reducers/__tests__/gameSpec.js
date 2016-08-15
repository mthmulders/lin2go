jest.unmock('../../actions');
jest.unmock('../index');

import { addLetterToGuess, cancelGame, startGame } from '../../actions';
import reducer from '../index';

describe('The \'START_GAME\' action', () => {
  it('should add a game to the app state', () => {
    // Arrange
    const initalState = {};
    const action = startGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.game).toBeDefined();
  });

  it('should create an initial -empty- guess', () => {
    // Arrange
    const initalState = {};
    const action = startGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.game.currentGuess).toBe('');
  });
});

describe('The \'CANCEL_GAME\' action', () => {
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

  it('should keep the number of wins unchanged', () => {
    // Arrange
    const initalState = { stats: { losses: 0, wins: 3 } };
    const action = cancelGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.stats.wins).toBe(3);
  });
});

describe('The \'ADD_LETTER_TO_GUESS\' action', () => {
  it('should add the supplied letter to the current guess', () => {
    // Arrange
    const initalState = { game: { currentGuess: '' } };
    const action = addLetterToGuess('a');

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.game.currentGuess).toBe('a');
  });
});
