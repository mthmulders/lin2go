jest.unmock('../../actions');
jest.unmock('../index');

import reducer from '../index';

describe('An unknown action', () => {
  it('should not alter the app state', () => {
    // Arrange
    const initalState = { foo: 'bar', baz: 42 };
    const action = { type: 'did\'t see that one coming' };

    // Act
    const state = reducer(initalState, action);

    // Assert
    expect(state).toBe(state);
  });
});
