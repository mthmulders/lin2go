jest.unmock('../../actions');
jest.unmock('../index');

import { hideStats, showStats } from '../../actions';
import reducer from '../nav';

describe('The \'SHOW_STATS\' action', () => {
  it('should trigger showing the stats', () => {
      // Arrange
      const initalState = {};
      const action = showStats();

      // Act
      const state = reducer(initalState, action);
      console.log('State after SHOW_STATS : ' + JSON.stringify(state));

      // Assert
      expect(state.showStats).toBe(true);
  });
});


describe('The \'HIDE_STATS\' action', () => {
  it('should trigger hiding the stats', () => {
    // Arrange
    const initalState = { showStats: true };
    const action = hideStats();

    // Act
    const state = reducer(initalState, action);
    console.log('State after HIDE_STATS : ' + JSON.stringify(state));

    // Assert
    expect(state.showStats).toBe(false);
  });

});
