jest.unmock('../logo');
jest.mock('../../resources/logo.png');

import React from 'react';
import { Image } from 'react-native';
import { createRenderer } from 'react-test-renderer/shallow';

import { findWithType } from 'react-shallow-testutils';

import Logo from '../logo';
import expectedImage from '../../resources/logo.png';

describe('The logo component', () => {
  const renderer = createRenderer();

  it('should show the game logo', () => {
    // Arrange

    // Act
    renderer.render(<Logo />);

    // Assert
    const output = renderer.getRenderOutput();
    var image = findWithType(output, Image);
    expect(image.props.source).toBe(expectedImage);
  });
});
