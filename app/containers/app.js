import React from 'react'
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Game from '../containers/game';
import Home from '../components/home';
import Logo from '../components/logo';
import styles from '../styles';

const App = (props) => {
  const { gameRunning } = props;

  return (
    <View style={ styles.container }>
      <Logo />
      { !gameRunning && <Home /> }
      { gameRunning && <Game /> }
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    gameRunning: state.game !== undefined
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
