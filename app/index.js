import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './containers/app';
import reducers from './reducers';
import styles from './styles'

const initialState = {};
const store = createStore(reducers, initialState);

export default () => (
  <Provider store={ store }>
    <App />
  </Provider>
);
