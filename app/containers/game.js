import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

import Attempts from '../components/attempts';
import EndGame from '../components/endGame';
import Guess from '../components/guess';
import styles from '../styles';

export const Game = (props) => {
  const { invalidWord } = props;
  if (invalidWord) {
    Toast.show('This word does not exist. Try again...',Toast.LONG);
  }
  return (
    <View>
      <Attempts />
      <Guess style={ styles.guess } />
      <EndGame />
    </View>
  );
};

Game.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    invalidWord: state.game.invalidWord
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
