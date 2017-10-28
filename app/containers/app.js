import React from 'react'
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

import Game from '../containers/game';
import Home from '../components/home';
import Logo from '../components/logo';
import Stats from '../components/stats';
import styles from '../styles';

import { clearMessage } from '../actions';

export const App = (props) => {
  const { clearMessage, gameRunning, message, showStats, stats } = props;

  if (message) {
    Toast.show(message, Toast.LONG);
    setTimeout(clearMessage, 4000);
  }

  return (
    <View style={ styles.container }>
      <Logo />
      { !gameRunning && !showStats && <Home /> }
      { gameRunning && !showStats && <Game /> }
      { !gameRunning && showStats && <Stats stats={ stats } /> }
    </View>
  );
};

/**
 * Props:
 *  message: string
 */

const mapStateToProps = (state) => {
  return {
    gameRunning: state.game.targetWord !== undefined,
    message: state.messages.message,
    showStats: state.nav.showStats
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(clearMessage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
