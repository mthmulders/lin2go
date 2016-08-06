import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import globalStyles from './styles'

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20
  },
  header: {
    fontSize: 36,
    marginBottom: 40
  }
});

const startNewGame = function() {
  console.log('Will start a new game here!');
};

export default function (props) {
  return (
    <View style={ globalStyles.container }>
      <Text style={ styles.header }>LIN2GO</Text>
      <Button style={ styles.button } onPress={ startNewGame }>
        <Text>Start new game</Text>
      </Button>
    </View>
  );
};
