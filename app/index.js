import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Home from './home';
import reducers from './reducers';

const store = createStore(reducers, {});

export default App = (props) => (
  <Provider store={ store }>
    <Home />
  </Provider>
);
