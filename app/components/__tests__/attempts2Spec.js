//
// Once https://github.com/facebook/react/issues/7386 is released, this
// file can be merged with attemptsSpec.js
//
jest.unmock('../attempts');

import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import { Attempts } from '../attempts';

describe('The attempts component', () => {

  it('should give visual feedback on the score of the attempt', () => {
    // Arrange
    const attempts = [
      {word: 'kiwis', score: [0, 0, 0, 0, 2]},
      {word: 'peren', score: [1, 1, 0, 2, 0]}
    ];

    // Act
    const tree = renderer.create(<Attempts attempts={ attempts } />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });

});
