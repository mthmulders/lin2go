jest.unmock('../endGame');

import React from 'react';
import { Text } from 'react-native';
import ReactTestUtils from 'react-addons-test-utils';

import { findAllWithType } from 'react-shallow-testutils';

import { EndGame } from '../endGame';

describe('The end-of-game component', () => {
  const renderer = ReactTestUtils.createRenderer();

  it('should show a message when the game is lost', () => {
    // Arrange

    // Act
    renderer.render(<EndGame lost={ true } word= { 'KIWIS' } />);
    const result = renderer.getRenderOutput();

    // Assert
    const texts = findAllWithType(result, Text).map((i) => i.props.children)[0];
    expect(texts.join('')).toBe('You lost. The correct word was KIWIS.');
  });

  it('should show a message when the game is won', () => {
    // Arrange

    // Act
    renderer.render(<EndGame won={ true } />);
    const result = renderer.getRenderOutput();

    // Assert
    const texts = findAllWithType(result, Text).map((i) => i.props.children);
    expect(texts[0]).toBe('Congratulations, you won!');
  });
});
