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
  looseGame,
  prefillGuess,
  rateAttempt,
  resetGuess,
  startGame,
  winGame
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
    expect(state.targetWord).toBe(targetWord.toUpperCase());
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

  it('should pre-fill one letter from the target word', () => {
    // Arrange
    const initalState = {};
    const action = startGame();

    // Act
    const state = reducer(initalState, action);

    // Assert
    const targetWord = state.targetWord;
    const letter = state.prefill.find(i => !!i);
    expect(letter.length).toBe(1);
    expect(targetWord.indexOf(letter[0])).toBeGreaterThan(-1);
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

describe('The \'PREFILL_GUESS\' action', () => {
  it('should prefill all letters which have correctly been guessed in earlier attempts', () => {
    // Arrange
    const targetWord = 'PEREN';
    const attempts = [
      { word: 'GAPEN', score: [0, 0, 1, 2, 2] },
      { word: 'STOEP', score: [0, 0, 0, 2, 1] }
    ];
    const prefill = [undefined,undefined,undefined,'E',undefined];
    const initialState = { targetWord, attempts, prefill };
    const action = prefillGuess();

    // Act
    const state = reducer(initialState, action);

    // Assert
    expect(state.prefill).toEqual([undefined,undefined,undefined,'E','N']);
  });

  it('should prefill the initial given letter even if it was not used in an attempt', () => {
    // Arrange
    const targetWord = 'APPEL';
    const attempts = [
      { word: 'KIEST', score: [0, 0, 1, 0, 0] }
    ];
    const prefill = [undefined,undefined,undefined,undefined,'L'];
    const initialState = { targetWord, attempts, prefill };
    const action = prefillGuess();

    // Act
    const state = reducer(initialState, action);

    // Assert
    expect(state.prefill).toEqual([undefined,undefined,undefined,undefined,'L']);
  });
});

describe('The \'WIN_GAME\' action', () => {
  it('should mark the game as won', () => {
    // Arrange
    const action = winGame();
    const game = { };

    // Act
    const state = reducer(game, action);

    // Assert
    expect(state.won).toBe(true);
    expect(state.lost).toBe(false);
  });
});

describe('The \'LOOSE_GAME\' action', () => {
  it('should mark the game as lost', () => {
    // Arrange
    const action = looseGame();
    const game = { };

    // Act
    const state = reducer(game, action);

    // Assert
    expect(state.won).toBe(false);
    expect(state.lost).toBe(true);
  });
});
