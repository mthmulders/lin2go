jest.unmock('../../app/actions');
jest.unmock('../../app/reducers/index');

const { hideStats, showStats } = require('../../app/actions');
const reducer = require('../../app/reducers/index').default;

describe('The \'SHOW_STATS\' action', () => {
  it('should trigger showing the stats', () => {
      // Arrange
      const initalState = {};
      const action = showStats();

      // Act
      const state = reducer(initalState, action);

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

    // Assert
    expect(state.showStats).toBe(false);
  });
//
//   it('should increment the number of losses with 1', () => {
//     // Arrange
//     const initalState = { stats: { losses: 0 } };
//     const action = cancelGame();
//
//     // Act
//     const state = reducer(initalState, action);
//
//     // Assert
//     expect(state.stats.losses).toBe(1);
//   });
});
