import React from 'react'
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Home from '../components/home';
import styles from '../styles';

const App = (props) => {
  const { gameRunning } = props;

  return (
      <View style={ styles.container }>
        <Text style={ styles.header }>LIN2GO</Text>
        { !gameRunning && <Home /> }
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
