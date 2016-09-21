import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { addLetterToGuess } from '../actions';
import styles from '../styles';

export const Guess = (props) => {
  const { addLetterToGuess, ended, guess, prefill } = props;
  // Keep a reference to each TextInput so we can auto-advance to the next one.
  const items = new Array(5);

  // Helper method to automatically advance to the next input by focussing it.
  const autoAdvance = (idx) => {
    if (items[idx + 1]) items[idx + 1].focus();
  };

  // Utility to quickly create a one-letter text input.
  const letterInput = (idx) => (
    <TextInput
      autoCapitalize={ 'characters' }
      autoFocus={ idx === 0 }
      autoCorrect={ false }
      blurOnSubmit={ false }
      editable={ idx === guess.length }
      maxLength={ 1 }
      onChangeText={ addLetterToGuess }
      onChange={ () => autoAdvance(idx) }
      placeholder={ prefill ? prefill[idx] : undefined }
      ref={ (ref) => items[idx] = ref }
      returnKeyType={ 'next' }
      style={ styles.letterInput }
      value={ idx <= guess.length ? guess[idx] : '' }
    />
  );

  return (
    <View style={ styles.guess }>
      { !ended && letterInput(0) }
      { !ended && letterInput(1) }
      { !ended && letterInput(2) }
      { !ended && letterInput(3) }
      { !ended && letterInput(4) }
    </View>
  )
};

const mapStateToProps = (state) => {
  return {
    ended: state.game.lost || state.game.won,
    guess: state.game.guess,
    prefill: state.game.prefill
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLetterToGuess: (letter) => dispatch(addLetterToGuess(letter))
  };
};

Guess.propTypes = {
  guess: React.PropTypes.string.isRequired,
  prefill: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default connect(mapStateToProps, mapDispatchToProps)(Guess);
