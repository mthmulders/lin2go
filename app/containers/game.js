import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { cancelGame } from '../actions';
import Guess from '../components/guess';
import styles from '../styles';

const Game = (props) => (
  <View>
    <Guess />
    <Button style={ styles.button } onPress={ props.cancelGame }>
      <Text>Give up</Text>
    </Button>
  </View>
);

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelGame: () => dispatch(cancelGame())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
