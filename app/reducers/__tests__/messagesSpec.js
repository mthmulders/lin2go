jest.unmock('../../actions');
jest.unmock('../messages');

import { clearMessage, showMessage } from '../../actions';
import reducer from '../messages';

describe('Showing and hiding messages', () => {
  describe('showing a message', () => {
    it('should put the message in app state', () => {
      // Arrange
      const message = 'Oops, an error';
      const action = showMessage(message);
      const initialState = {};

      // Act
      const state = reducer(initialState, action);

      // Assert
      expect(state.message).toBe(message);
    });
  });

  describe('clearing a message', () => {
    it('should clear the message from app state', () => {
      // Arrange
      const initialState = { message: 'Oops, an error' };
      const action = clearMessage();

      // Act
      const state = reducer(initialState, action);

      // Assert
      expect(state.message).toBeUndefined();
    });
  });
});