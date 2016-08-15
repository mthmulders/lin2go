import React from 'react'
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Game from '../containers/game';
import Home from '../components/home';
import Logo from '../components/logo';
import Stats from '../components/stats';
import styles from '../styles';

export const App = (props) => {
  const { gameRunning, showStats, stats } = props;

  return (
    <View style={ styles.container }>
      <Logo />
      { !gameRunning && !showStats && <Home /> }
      { gameRunning && !showStats && <Game /> }
      { !gameRunning && showStats && <Stats stats={ stats } /> }
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    gameRunning: state.game !== undefined,
    showStats: state.showStats
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
