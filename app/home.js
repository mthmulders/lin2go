import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { startGame } from './actions';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20
  }
});

const Home = (props) => (
  <Button style={ styles.button } onPress={ props.startGame }>
    <Text>Start new game</Text>
  </Button>
);

const mapStateToProps = (state) => {
  return {
    gameRunning: state.game !== undefined
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('mapDispatchToProps: startGame is a(n) ' + typeof startGame);
  const ding = startGame();
  console.log('mapDispatchToProps: the result of invoking startGame is a(n) ' + typeof ding);
  console.log('mapDispatchToProps: the result of invoking startGame is ' + JSON.stringify(ding));
  return {
    startGame: () => dispatch(startGame())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
