jest.unmock('../logo');

import React from 'react';
import { Image } from 'react-native';
import ReactTestUtils from 'react-addons-test-utils';

import { findWithType } from 'react-shallow-testutils';

import Logo from '../logo';

describe('The logo component', () => {
  const renderer = ReactTestUtils.createRenderer();

  it('should show the game logo', () => {
    // Arrange

    // Act
    renderer.render(<Logo />);

    // Assert
    const output = renderer.getRenderOutput();
    var image = findWithType(output, Image);
    expect(image.props.source).toBe('../resources/logo.png');
  });
});
