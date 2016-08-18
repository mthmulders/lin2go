jest.unmock('../attempts');

import React from 'react';
import { Text } from 'react-native';
import ReactTestUtils from 'react-addons-test-utils';

import { findAllWithType } from 'react-shallow-testutils';

import { Attempts } from '../attempts';

describe('The attempts component', () => {
  const renderer = ReactTestUtils.createRenderer();

  it('should show previous attempts to guess the word', () => {
    // Arrange
    const attempts = ['kiwis'];

    // Act
    renderer.render(<Attempts attempts={ attempts } />);

    // Assert
    const result = renderer.getRenderOutput();
    const texts = findAllWithType(result, Text).map((i) => i.props.children);
    expect(texts).toEqual(['k', 'i', 'w', 'i', 's']);
  });
});
