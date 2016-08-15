jest.unmock('../logo');

import React from 'react';
import { Image } from 'react-native';
import ReactTestUtils from 'react-addons-test-utils';

import { findAllWithType } from 'react-shallow-testutils';

import Logo from '../logo';

describe('The logo component', () => {
  it('should show the game logo', () => {
    // Arrange
    const renderer = ReactTestUtils.createRenderer();

    // Act
    renderer.render(<Logo />);

    // Assert
    const result = renderer.getRenderOutput();
    var sources = findAllWithType(result, Image).map((i) => i.props.source);
    expect(sources.length).toBe(1)
    expect(sources[0]).toBe('../resources/logo.png');
  });
});
