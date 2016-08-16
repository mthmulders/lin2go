jest.unmock('../guess');

import React from 'react';
import { TextInput } from 'react-native';
import ReactTestUtils from 'react-addons-test-utils';

import { findAllWithType } from 'react-shallow-testutils';

import { Guess } from '../guess';

describe('The guess component', () => {
  const renderer = ReactTestUtils.createRenderer();

  it('should only allow to edit the next letter in the current guess', () => {
    // Arrange
    const guess = 'ki';

    // Act
    renderer.render(<Guess guess={ guess } />);

    // Assert
    const result = renderer.getRenderOutput();
    const textInputs = findAllWithType(result, TextInput);
    var editables = textInputs.map((i) => i.props.editable);
    expect(editables).toEqual([false, false, true, false, false]);
  });
});
