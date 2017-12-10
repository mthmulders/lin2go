import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './containers/app';
import reducers from './reducers';
import styles from './styles'

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducers, {}, middleware);

import { loadHistory } from  './statsStorage'
loadHistory(store.dispatch)

export default () => (
  <Provider store={ store }>
    <App />
  </Provider>
);
