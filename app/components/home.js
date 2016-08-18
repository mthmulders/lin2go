import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { showStats, startGame } from '../actions';
import styles from '../styles';

export const Home = (props) => (
  <View>
    <Button style={ styles.button } onPress={ props.startGame }>
      <Text style={ styles.buttonLabel }>Start new game</Text>
    </Button>
    <Button style={ styles.button } onPress={ props.showStats }>
      <Text style={ styles.buttonLabel }>Statistics</Text>
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
    showStats: () => dispatch(showStats()),
    startGame: () => dispatch(startGame())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
