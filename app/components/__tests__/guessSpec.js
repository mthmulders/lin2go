jest.unmock('../guess');

import React from 'react';
import { TextInput } from 'react-native';
import { createRenderer } from 'react-test-renderer/shallow';

import { findAllWithType } from 'react-shallow-testutils';

import { Guess } from '../guess';

describe('The guess component', () => {
  const renderer = createRenderer();

  it('should only allow to edit the next letter in the current guess', () => {
    // Arrange
    const guess = 'ki';

    // Act
    renderer.render(<Guess guess={ guess } />);
    const result = renderer.getRenderOutput();

    // Assert
    const textInputs = findAllWithType(result, TextInput);
    const editables = textInputs.map(i => i.props.editable);
    expect(editables).toEqual([false, false, true, false, false]);
  });

  it('should prefill correctly guessed letters from earlier attempts', () => {
    // Arrange
    const prefill = new Array(5).fill(undefined);
    prefill[0] = 'P';

    // Act
    renderer.render(<Guess guess={ 'ki' } prefill={ prefill } />);
    const result = renderer.getRenderOutput();

    // Assert
    const textInputs = findAllWithType(result, TextInput);
    const placeholders = textInputs.map(i => i.props.placeholder);
    expect(placeholders).toEqual(['P', undefined, undefined, undefined, undefined]);
  });
});
