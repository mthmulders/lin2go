import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { cancelGame, looseGame, startGame } from '../actions';
import styles from '../styles';

export const EndGame = (props) => {
  const { back, cancelGame, lost, retry, won, word } = props;

  return (
    <View style={ styles.endGame }>
      { !won && !lost && <View>
        <Button style={ styles.button } onPress={ cancelGame }>
          <Text style={ styles.buttonLabel }>Give up</Text>
        </Button>
      </View>}
      { won && <Text>Congratulations, you won!</Text> }
      { lost && <Text>You lost. The correct word was {word}.</Text> }
      { (won || lost) &&
        <Button style={ styles.button } onPress={ retry }>
          <Text style={ styles.buttonLabel }>Retry</Text>
        </Button> }
      { (won || lost) &&
        <Button style={ styles.button } onPress={ back }>
          <Text style={ styles.buttonLabel }>Back</Text>
        </Button> }
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    lost: state.game.lost,
    won: state.game.won,
    word: state.game.targetWord
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    back: () => dispatch(cancelGame()),
    cancelGame: () => {
      dispatch(looseGame());
      dispatch(cancelGame());
    },
    retry: () => dispatch(startGame())
  };
};

/**
 * Props:
 *  lost: bool
 *  won: bool
 */

export default connect(mapStateToProps, mapDispatchToProps)(EndGame);
