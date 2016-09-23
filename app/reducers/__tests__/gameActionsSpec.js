jest.unmock('../../actions');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import {
  addLetterToGuess, ADD_LETTER_TO_GUESS,
  evalGameEnd, EVAL_GAME_END,
  LOOSE_GAME,
  PREFILL_GUESS,
  rateLetter, RATE_LETTER,
  RESET_GUESS,
  WIN_GAME
} from '../../actions';

jest.useFakeTimers();

describe('The action creator for \'RATE_LETTER\' action', () => {
  it('should dispatch an \'RATE_LETTER\' action with the desired index', (done) => {
    // Arrange
    const initialState = { game: {
      guess: 'kiwis',
      attempts: [ { word: 'PEREN', score: [0,0,0,0,0] } ]
    } };
    const store = mockStore(initialState);

    // Act
    const result = store.dispatch(rateLetter(0));
    jest.runOnlyPendingTimers();

    // Assert
    result.then(() => {
      expect(store.getActions().length).toBe(1);
      // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
      expect(store.getActions()[0]).toEqual({ type: RATE_LETTER, index: 0 });
      done();
    });
  });

  describe('when the desired index is smaller than the length of a word', () => {
    it('should dispatch the next \'RATE_LETTER\' action', (done) => {
      // Arrange
      const initialState = { game: {
        guess: 'kiwis',
        attempts: [ { word: 'PEREN', score: [0,0,0,0,0] } ]
      } };
      const store = mockStore(initialState);

      // Act
      const result = store.dispatch(rateLetter(0));

      // Assert
      jest.runAllTimers();
      result.then(() => {
        // Dispatched action to rate desired letter is tested in different spec.
        expect(store.getActions()[1]).toEqual({ type: RATE_LETTER, index: 1 });
        expect(store.getActions()[2]).toEqual({ type: RATE_LETTER, index: 2 });
        expect(store.getActions()[3]).toEqual({ type: RATE_LETTER, index: 3 });
        expect(store.getActions()[4]).toEqual({ type: RATE_LETTER, index: 4 });
        // Other dispatched actions are tested in different specs.
        done();
      });
    });
  });

  describe('when the last letter was rated', () => {
    it('should dispatch an action to pre-fill the correctly guessed letters', (done) => {
      // Arrange
      const initialState = { game: {
        guess: 'kiwis',
        attempts: [ { word: 'PEREN', score: [0,0,0,0,0] } ]
      } };
      const store = mockStore(initialState);

      // Act
      const result = store.dispatch(rateLetter(4));

      // Assert
      jest.runAllTimers();
      result.then(() => {
        expect(store.getActions().length).toBe(2);
        // First dispatched action is rating the last letter of the guess.
        expect(store.getActions()[1]).toEqual({ type: PREFILL_GUESS });
        done();
      });
    });
  });
});

describe('The action creator for \'EVAL_GAME_END\' action', () => {
  describe('when the word is guessed correctly', () => {
    it('should dispatch an action to win the game', () => {
      // Arrange
      const initialState = { game: { attempts: [
        { score: [2, 2, 2, 2, 2 ], word: 'KIWIS' }
      ]} };
      const store = mockStore(initialState);

      // Act
      store.dispatch(evalGameEnd());

      // Assert
      expect(store.getActions().length).toBe(1);
      expect(store.getActions()[0]).toEqual({ type: WIN_GAME });
    });
  });
  describe('when the word is not guessed correctly', () => {
    describe('when there are turns left', () => {
      it('should not dispatch an action', () => {
        // Arrange
        const initialState = { game: { attempts: [
          { score: [0, 0, 0, 0, 0 ], word: 'KIWIS' }
        ]} };
        const store = mockStore(initialState);

        // Act
        store.dispatch(evalGameEnd());

        // Assert
        expect(store.getActions().length).toBe(0);
      });
    });

    describe('when there are no turns left', () => {
      it('should dispatch an action to loose the game', () => {
        // Arrange
        const initialState = { game: { attempts: [
          { score: [0, 0, 0, 0, 0 ], word: 'KIWIS' },
          { score: [0, 0, 0, 0, 0 ], word: 'KIWIS' },
          { score: [0, 0, 0, 0, 0 ], word: 'KIWIS' },
          { score: [0, 0, 0, 0, 0 ], word: 'KIWIS' },
          { score: [0, 0, 0, 0, 0 ], word: 'KIWIS' },
        ]} };
        const store = mockStore(initialState);

        // Act
        store.dispatch(evalGameEnd());

        // Assert
        expect(store.getActions().length).toBe(1);
        expect(store.getActions()[0]).toEqual({ type: LOOSE_GAME });
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
    describe('when the word is valid', () => {
      it('should dispatch an additional \'RATE_LETTER\' action', (done) => {
        // Arrange
        const initialState = { game: { guess: 'kiwis' } };
        const store = mockStore(initialState);

        // Act
        store.dispatch(addLetterToGuess(''));

        // Assert
        setTimeout(() => {
          expect(store.getActions().length).toBe(3);
          // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
          expect(store.getActions()[2]).toEqual({ type: RATE_LETTER, index: 0 });
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

    describe('when the word is invalid', () => {
      it('should dispatch an additional \'RESET_GUESS\' action', (done) => {
        // Arrange
        const initialState = { game: { guess: 'kiwis', invalidWord: true } };
        const store = mockStore(initialState);

        // Act
        store.dispatch(addLetterToGuess(''));

        // Assert
        setTimeout(() => {
          expect(store.getActions().length).toBe(2);
          // Prefer to use toContainEqual, see https://github.com/facebook/jest/issues/1369
          expect(store.getActions()[1]).toEqual({ type: RESET_GUESS });
          done();
        }, 1500);
        jest.runOnlyPendingTimers();
      });
    });
  });
});
