import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Button from 'apsl-react-native-button';

import styles from '../styles';


const GuessPanel = (props) => (
  <View>
    
    <Button style={ styles.button } onPress={ props.cancelGame }>
      <Text>Give up</Text>
    </Button>
  </View>
);

GuessPanel.propTypes = {
  cancelGame: React.PropTypes.func.isRequired
}

export default GuessPanel;
