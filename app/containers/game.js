import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Attempts from '../components/attempts';
import EndGame from '../components/endGame';
import Guess from '../components/guess';
import styles from '../styles';

export const Game = (props) => {
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
