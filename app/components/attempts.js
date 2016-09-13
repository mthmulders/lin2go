import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';

export const Attempts = (props) => {
  const { attempts } = props;

  const renderLetter = (letterWithScore, idx) => {
    let style = styles.attemptLetter;
    if (letterWithScore.score === 2) {
      style = styles.attemptLetterOnRightLocation;
    } else if (letterWithScore.score === 1) {
      style = styles.attemptLetterOnOtherLocation;
    }
    return (<Text style={ style } key={ idx }>{ letterWithScore.letter }</Text>)
  };

  const renderAttempt = (attempt, attemptId) => {
    const letters = attempt.word.split('');
    const lettersWithScore = letters.map((elem, index) => {
      return {
        letter: elem,
        score: attempt.score[index]
      }
    });
    return (
      <View style={ styles.attempt } key={ attemptId }>
        { lettersWithScore.map((elem, index) => renderLetter(elem, `${attemptId}.${index}`)) }
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
