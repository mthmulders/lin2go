jest.unmock('../home');

import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import { Home } from '../home';

describe('The home screen', () => {
  it('should show menu buttons', () => {
    // Arrange

    // Act
    const tree = renderer.create(<Home />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
