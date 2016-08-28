jest.unmock('../../actions');
jest.unmock('../index');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import {
  ADD_LETTER_TO_GUESS, addLetterToGuess,
  addGuess,
  cancelGame,
  RATE_ATTEMPT, rateAttempt,
  RESET_GUESS, resetGuess,
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

describe('The action creator for \'ADD_LETTER_TO_GUESS\' action', () => {
  // Since the mockStore does not actually perform the actions,
  // these tests set an initialState that looks as if the ADD_LETTER_TO_GUESS
  // action itself had already been performed.

  describe('when the letter would not make the guess complete', () => {
    it('should dispatch an \'ADD_LETTER_TO_GUESS\' action', () => {
      // Arrange
      const initialState = { game: { guess: '' } };
      const store = mockStore(initialState);

      // Act
      store.dispatch(addLetterToGuess('a'));

      // Assert
      expect(store.getActions().length).toBe(1);
      expect(store.getActions()[0]).toEqual({ type: ADD_LETTER_TO_GUESS, letter: 'a' });
    });
  });

  describe('when the letter would make the guess complete', () => {
    it('should dispatch an additional \'RATE_ATTEMPT\' action', () => {
      // Arrange
      const initialState = { game: { guess: 'kiwis' } };
      const store = mockStore(initialState);

      // Act
      store.dispatch(addLetterToGuess(''));

      // Assert
      expect(store.getActions().length).toBe(3);
      // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
      expect(store.getActions()[2]).toEqual({ type: RATE_ATTEMPT, index: 0 });
    });

    it('should dispatch an additional \'RESET_GUESS\' action', () => {
      // Arrange
      const initialState = { game: { guess: 'kiwis' } };
      const store = mockStore(initialState);

      // Act
      store.dispatch(addLetterToGuess(''));

      // Assert
      expect(store.getActions().length).toBe(3);
      // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
      expect(store.getActions()[1]).toEqual({ type: RESET_GUESS });
    });
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
});
