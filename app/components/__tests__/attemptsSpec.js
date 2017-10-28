jest.unmock('../attempts');

import React from 'react';
import { Text } from 'react-native';
import { createRenderer } from 'react-test-renderer/shallow';

import { findAllWithType } from 'react-shallow-testutils';

import { Attempts } from '../attempts';

describe('The attempts component', () => {
  const renderer = createRenderer();

  it('should show previous attempts to guess the word', () => {
    // Arrange
    const attempts = [{word: 'kiwis', score:[0,0,0,0,0]}];

    // Act
    renderer.render(<Attempts attempts={ attempts } />);

    // Assert
    const result = renderer.getRenderOutput();
    const texts = findAllWithType(result, Text).map((i) => i.props.children);
    expect(texts).toEqual(['k', 'i', 'w', 'i', 's']);
  });
});
