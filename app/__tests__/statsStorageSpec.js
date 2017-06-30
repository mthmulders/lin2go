jest.mock('../actions');

import { AsyncStorage } from 'react-native';
const mockStorage = require('mock-async-storage');

import { loadHistory, saveHistory } from '../statsStorage';
import { restoreStats, showMessage } from '../actions';

describe('Statistics storage and retrieval', () => {
  beforeEach(() => {
    restoreStats.mockClear();
    showMessage.mockClear();
    mockStorage.mock();
  });

  afterEach(() => {
    mockStorage.release();
  });

  it('should retrieve the number of losses and wins from local storage', async () => {
    // Arrange
    const dispatch = jest.fn();
    AsyncStorage.multiSet([['@stats:losses','3'],['@stats:wins','4']]);
    const action = {};
    restoreStats.mockImplementation(() => action)

    // Act
    await loadHistory(dispatch);

    // Assert
    expect(restoreStats).toBeCalledWith(3, 4);
    expect(dispatch).toBeCalledWith(action);
    expect(showMessage).not.toBeCalled();
  });

  it('should fall back to zero when no values are present', async () => {
    // Arrange
    const dispatch = jest.fn();
    AsyncStorage.multiSet([['@stats:losses',null],['@stats:wins',null]]);
    const action = {};
    restoreStats.mockImplementation(() => action)

    // Act
    await loadHistory(dispatch);

    // Assert
    expect(restoreStats).toBeCalledWith(0, 0);
    expect(dispatch).toBeCalledWith(action);
    expect(showMessage).not.toBeCalled();
  });

  it('should display a message when an error occurred while loading', async () => {
    // Arrange
    const dispatch = jest.fn();
    const error = { message: 'Booh!' };
    restoreStats.mockImplementation(() => { throw error });

    // Act
    await loadHistory(dispatch);

    // Assert
    expect(showMessage).toBeCalled();
    expect(dispatch).toBeCalled();
  });

  it('should save the number of losses and wins to local storage', async () => {
    // Arrange
    const dispatch = jest.fn();
    AsyncStorage.multiSet([undefined,undefined]);
    const losses = 3;
    const wins = 4;

    // Act
    await saveHistory(dispatch, losses, wins);

    // Assert
    const result = await AsyncStorage.multiGet(['@stats:losses', '@stats:wins'])
    expect(showMessage).not.toBeCalled();
    expect(dispatch).not.toBeCalled();
  });

  it('should display a message when an error occurred while saving', async () => {
    // Arrange
    const dispatch = jest.fn();
    const losses = null;
    const wins = 4;

    // Act
    await saveHistory(dispatch, losses, wins);

    // Assert
    expect(showMessage).toBeCalled();
    expect(dispatch).toBeCalled();
  });
});
