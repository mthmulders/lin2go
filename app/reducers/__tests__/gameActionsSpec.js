jest.unmock('../../actions');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import {
  addLetterToGuess, ADD_LETTER_TO_GUESS,
  PREFILL_GUESS,
  rateAttempt, RATE_ATTEMPT,
  RESET_GUESS
} from '../../actions';

describe('The action creator for \'RATE_ATTEMPT\' action', () => {
  it('should dispatch an \'RATE_ATTEMPT\' action with the desired index', (done) => {
    // Arrange
    const initialState = { game: { guess: 'kiwis' } };
    const store = mockStore(initialState);

    // Act
    const result = store.dispatch(rateAttempt(0));
    jest.runOnlyPendingTimers();

    // Assert
    result.then(() => {
      expect(store.getActions().length).toBe(1);
      // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
      expect(store.getActions()[0]).toEqual({ type: RATE_ATTEMPT, index: 0 });
      done();
    });
  });

  describe('when the desired index is smaller than the length of a word', () => {
    it('should wait a while and then dispatch the next \'RATE_ATTEMPT\' action', (done) => {
      // Arrange
      const initialState = { game: { guess: 'kiwis' } };
      const store = mockStore(initialState);

      // Act
      const result = store.dispatch(rateAttempt(0));

      // Assert
      jest.runAllTimers();
      result.then(() => {
        expect(store.getActions().length).toBe(6);
        // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
        expect(store.getActions()[0]).toEqual({ type: RATE_ATTEMPT, index: 0 });
        expect(store.getActions()[1]).toEqual({ type: RATE_ATTEMPT, index: 1 });
        expect(store.getActions()[2]).toEqual({ type: RATE_ATTEMPT, index: 2 });
        expect(store.getActions()[3]).toEqual({ type: RATE_ATTEMPT, index: 3 });
        expect(store.getActions()[4]).toEqual({ type: RATE_ATTEMPT, index: 4 });
        done();
      });
    });
  });

  describe('when the last letter was rated', () => {
    it('should dispatch an action to pre-fill the correctly guessed letters', (done) => {
      // Arrange
      const initialState = { game: { guess: 'kiwis' } };
      const store = mockStore(initialState);

      // Act
      const result = store.dispatch(rateAttempt(0));

      // Assert
      jest.runAllTimers();
      result.then(() => {
        expect(store.getActions().length).toBe(6);
        // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
        expect(store.getActions()[5]).toEqual({ type: PREFILL_GUESS });
        done();
      });
    });
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
    it('should dispatch an additional \'RATE_ATTEMPT\' action', (done) => {
      // Arrange
      const initialState = { game: { guess: 'kiwis' } };
      const store = mockStore(initialState);

      // Act
      store.dispatch(addLetterToGuess(''));

      // Assert
      setTimeout(() => {
        expect(store.getActions().length).toBe(3);
        // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
        expect(store.getActions()[2]).toEqual({ type: RATE_ATTEMPT, index: 0 });
        done();
      }, 1500);
      jest.runOnlyPendingTimers();
    });

    it('should dispatch an additional \'RESET_GUESS\' action', (done) => {
      // Arrange
      const initialState = { game: { guess: 'kiwis' } };
      const store = mockStore(initialState);

      // Act
      store.dispatch(addLetterToGuess(''));

      // Assert
      setTimeout(() => {
        expect(store.getActions().length).toBe(3);
        // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
        expect(store.getActions()[1]).toEqual({ type: RESET_GUESS });
        done();
      }, 1500);
      jest.runOnlyPendingTimers();
    });
  });
});
