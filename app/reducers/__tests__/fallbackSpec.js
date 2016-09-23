// Unmock all other reducers because otherwise 'combineReducers' will warn about
// the fact that these reducers returned undefined during initialization.
jest.unmock('../game');
jest.unmock('../index');
jest.unmock('../messages');
jest.unmock('../nav');
jest.unmock('../stats');
// Unmock Redux so we can use 'combineReducers'.
jest.unmock('redux');

import reducer from '../index';

describe('An unknown action', () => {
  it('should not alter the app state', () => {
    // Arrange
    const initalState = { game: 'bar', stats: 42 };
    const action = { type: 'did\'t see that one coming' };

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state).toBe(state);
  });
});
