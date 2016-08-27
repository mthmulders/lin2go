import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { cancelGame } from '../actions';
import Attempts from '../components/attempts';
import Guess from '../components/guess';
import styles from '../styles';

const Game = (props) => (
  <View>
    <Attempts />
    <Guess style={ styles.guess } />
    <Button style={ styles.button } onPress={ props.cancelGame }>
      <Text style={ styles.buttonLabel }>Give up</Text>
    </Button>
  </View>
);

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelGame: () => {
      dispatch(cancelGame());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
