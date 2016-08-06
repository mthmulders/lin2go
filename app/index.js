import React, { Component } from 'react';
import { Actions, Scene, Reducer, Router } from 'react-native-router-flux';
import { StyleSheet, Text, View } from 'react-native';

import Home from './home'
import reducer from './reducers/'

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={ Home } initial={ true } />
  </Scene>
);

export default App = function (props) {
  return <Router createReducer={ reducer } scenes={ scenes } />
};
