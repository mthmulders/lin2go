jest.mock('react-native-simple-toast', () => {
  return { show: jest.fn() };
});

import React from 'react';
import Toast from 'react-native-simple-toast';
import { createRenderer } from 'react-test-renderer/shallow';

jest.unmock('../app');
import { App } from '../app';

jest.useFakeTimers();
const renderer = createRenderer();

describe('The application', () => {

  beforeEach(() => {
    Toast.show.mockClear();
  });

  describe('when a message should be displayed', () => {
    it('should show a toast', () => {
      // Arrange
      const message = 'Oops, some error';

      // Act
      renderer.render(<App message={ message } clearMessage={ () => { } } />);

      // Assert
    //   setTimeout(() => {
        expect(Toast.show).toBeCalledWith(message, undefined);
        // done();
    //   }, 1500);
    //   jest.runOnlyPendingTimers();
    });

    it('should clear the message after four seconds', (done) => {
      // Arrange
      const clearMessage = jest.fn();

      // Act
      renderer.render(<App message={ 'Hi' } clearMessage={ clearMessage } />);

      // Assert
      setTimeout(() => {
        expect(clearMessage).toBeCalled();
        done();
      }, 5000);
      jest.runOnlyPendingTimers();
    });
  });

  describe('when a message should be displayed', () => {
    it('should not show a toast', () => {
      // Arrange

      // Act
      renderer.render(<App />);

      // Assert
    //   setTimeout(() => {
        expect(Toast.show).not.toBeCalled();
        // done();
    //   }, 1500);
    //   jest.runOnlyPendingTimers();
    });
  });
});