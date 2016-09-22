jest.unmock('../statsStorage');
jest.mock('react-native-simple-toast', () => {
  return { show: jest.fn() };
});
jest.mock('../actions');

import { AsyncStorage } from 'react-native';
import Toast from 'react-native-simple-toast';

import { loadHistory, saveHistory } from '../statsStorage';
import { restoreStats } from '../actions';

jest.useFakeTimers();

describe('Statistics storage and retrieval', () => {
  beforeEach(() => {
    Toast.show.mockClear();
  });

  it('should retrieve the number of losses and wins from local storage', (done) => {
    // Arrange
    const dispatch = jest.fn();
    AsyncStorage.multiGet = jest.fn(args => {
      return Promise.resolve([["@stats:losses",3],["@stats:wins",4]]);
    });
    const action = {};
    restoreStats.mockImplementation(() => action)

    // Act
    loadHistory(dispatch);

    // Assert
    setTimeout(() => {
      expect(restoreStats).toBeCalledWith(3, 4);
      expect(dispatch).toBeCalledWith(action);
      expect(Toast.show).not.toBeCalled();
      done();
    }, 1500);
    jest.runOnlyPendingTimers();
  });

  it('should fall back to zero when no values are present', (done) => {
    // Arrange
    const dispatch = jest.fn();
    AsyncStorage.multiGet = jest.fn(args => {
      return Promise.resolve([["@stats:losses",null],["@stats:wins",null]]);
    });
    const action = {};
    restoreStats.mockImplementation(() => action)

    // Act
    loadHistory(dispatch);

    // Assert
    setTimeout(() => {
      expect(restoreStats).toBeCalledWith(0, 0);
      expect(dispatch).toBeCalledWith(action);
      expect(Toast.show).not.toBeCalled();
      done();
    }, 1500);
    jest.runOnlyPendingTimers();
  });

  it('should display a toast when an error occurred', () => {
    // Arrange
    const dispatch = jest.fn();
    const error = { message: 'Booh!' };
    AsyncStorage.multiGet = jest.fn(() => { throw error; });

    // Act
    loadHistory(dispatch);

    // Assert
    expect(dispatch).not.toBeCalled();
    expect(Toast.show).toBeCalled();
  });

  it('should save the number of losses and wins to local storage', (done) => {
    // Arrange
    AsyncStorage.multiSet = jest.fn(() => {
      return Promise.resolve([undefined,undefined]);
    });
    const losses = 3;
    const wins = 4;

    // Act
    expect(Toast.show).not.toBeCalled();
    saveHistory(losses, wins);
    expect(Toast.show).not.toBeCalled();

    // Assert
    setTimeout(() => {
      expect(AsyncStorage.multiSet).toBeCalledWith([["@stats:losses",losses],["@stats:wins",wins]]);
      expect(Toast.show).not.toBeCalled();
      done();
    }, 1500);
    jest.runOnlyPendingTimers();
  });

  it('should display a toast when an error occurred', (done) => {
    // Arrange
    AsyncStorage.multiSet = jest.fn(() => {
      return Promise.resolve(['An error',{message:'Another error'}]);
    });
    const losses = 3;
    const wins = 4;

    // Act
    saveHistory(losses, wins);

    // Assert
    setTimeout(() => {
      expect(AsyncStorage.multiSet).toBeCalledWith([["@stats:losses",losses],["@stats:wins",wins]]);
      expect(Toast.show).toBeCalled();
      done();
    }, 1500);
    jest.runOnlyPendingTimers();
  });
});
