import React from 'react';
import { Image } from 'react-native';

import styles from '../styles';

export default () => (
  <Image source={ require('../resources/logo.png') } style={ styles.logo } />
);
