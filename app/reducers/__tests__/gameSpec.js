jest.unmock('../../actions');
jest.unmock('../game');
jest.unmock('../index');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import {
  ADD_LETTER_TO_GUESS,
  addGuess,
  cancelGame,
  rateAttempt,
  resetGuess,
  startGame
} from '../../actions';
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
    const initialState = { guess: '' };
    const action = { type: ADD_LETTER_TO_GUESS, letter: 'a' };
    const store = mockStore(initialState);

    // Act
    const state = reducer(initialState, action);

    // Assert
    expect(state.guess).toBe('a');
  });

  describe('when the guess is 5 letters long', () => {
    it('should register the attempt', () => {
      // Arrange
      const initalState = { attempts: [], guess: 'kiwi' };
      const action = { type: ADD_LETTER_TO_GUESS, letter: 's' };

      // Act
      const state = reducer(initalState, action);

      // Assert
      expect(state.attempts[0].word).toBe('KIWIS');
      expect(state.attempts[0].score).toEqual([,,,,,]);
    });
  });
});

describe('The \'RESET_GUESS\' action', () => {
  it('should create a new empty guess', () => {
    // Arrange
    const initalState = { attempts: [], guess: 'kiwi' };
    const action = resetGuess();

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.guess).toBe('');
  });
});

describe('The \'RATE_ATTEMPT\' action', () => {
  it('should rate a letter that is on the right location with 2', () => {
    // Arrange
    const initalState = { targetWord: 'kiwis', attempts: [ { word: 'kiest', score: new Array(5) } ] };
    const action = { type: 'RATE_ATTEMPT', index: 0 };

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.attempts[0].score[0]).toEqual(2);
  });

  it('should rate a letter that is on a wrong location with 1', () => {
    // Arrange
    const initalState = { targetWord: 'kiwis', attempts: [ { word: 'kiest', score: new Array(5) } ] };
    const action = { type: 'RATE_ATTEMPT', index: 3 };

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.attempts[0].score[3]).toEqual(1);
  });

  it('should rate a letter that is competely wrong location with 0', () => {
    // Arrange
    const initalState = { targetWord: 'kiwis', attempts: [ { word: 'kiest', score: new Array(5) } ] };
    const action = { type: 'RATE_ATTEMPT', index: 2 };

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state.attempts[0].score[2]).toEqual(0);
  });
});
