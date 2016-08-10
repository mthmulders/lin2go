import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { startGame } from '../actions';
import styles from '../styles';

const Home = (props) => (
  <View>
    <Button style={ styles.button } onPress={ props.startGame }>
      <Text>Start new game</Text>
    </Button>
  </View>
);

const mapStateToProps = (state) => {
  return {
    gameRunning: state.game !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch(startGame())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
