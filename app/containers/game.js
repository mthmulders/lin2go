import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { cancelGame } from '../actions';
import GuessPanel from '../components/guessPanel';
import styles from '../styles';

const Game = (props) => (
  <View>
    <GuessPanel cancelGame={ props.cancelGame }/>
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
