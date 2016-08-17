jest.unmock('../../actions');
jest.unmock('../index');

import { addLetterToGuess, cancelGame, startGame } from '../../actions';
import reducer from '../game';
jest.mock('../../randomWord');
import randomWord from '../../randomWord';

describe('The \'START_GAME\' action', () => {
  it('should add a target word to the game state', () => {
    // Arrange
    const initalState = {};
    const action = startGame();
    const targetWord = 'kiwis';
    randomWord.mockImplementation(() => targetWord);

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.targetWord).toBe(targetWord);
  });

  it('should create an initial empty guess', () => {
    // Arrange
    const initalState = {};
    const action = startGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.guess).toBe('');
  });

  it('should create an empty array of previous attempts', () => {
    // Arrange
    const initalState = {};
    const action = startGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.attempts).toEqual([]);
  });
});

describe('The \'CANCEL_GAME\' action', () => {
  it('should remove the running game from the app state', () => {
    // Arrange
    const initalState = { targetWord: 'kiwis' };
    const action = cancelGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state).toEqual({});
  });
});

describe('The \'ADD_LETTER_TO_GUESS\' action', () => {
  it('should add the supplied letter to the current guess', () => {
    // Arrange
    const initalState = { guess: '' };
    const action = addLetterToGuess('a');

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.guess).toBe('a');
  });

  describe('when the guess is 5 letters long', () => {
    it('should register the attempt', () => {
      // Arrange
      const initalState = { attempts: [], guess: 'kiwi' };
      const action = addLetterToGuess('s');

      // Act
      const state = reducer(initalState, action);

      // Assert
      expect(state.attempts[0]).toBe('kiwis');
    });

    it('should create a new empty guess', () => {
      // Arrange
      const initalState = { attempts: [], guess: 'kiwi' };
      const action = addLetterToGuess('s');

      // Act
      const state = reducer(initalState, action);

      // Assert
      expect(state.guess).toBe('');
    });
  });
});
