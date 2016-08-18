import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';

export const Attempts = (props) => {
  const { attempts } = props;

  const renderLetter = (letter, idx) => {
    return (<Text style={ styles.attemptLetter } key={ idx }>{ letter }</Text>)
  };

  const renderAttempt = (attempt, attemptId) => {
    const letters = attempt.word.split('');
    return (
      <View style={ styles.attempt } key={ attemptId }>
        { letters.map((letter, letterId) => renderLetter(letter, `${attemptId}.${letterId}`)) }
      </View>
    );
  };

  return (
    <View style={ styles.attempts }>
     { attempts.map(renderAttempt) }
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    attempts: state.game.attempts
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

Attempts.propTypes = {
  attempts: React.PropTypes.arrayOf(React.PropTypes.shape({
    word: React.PropTypes.string.isRequired
  })).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Attempts);
