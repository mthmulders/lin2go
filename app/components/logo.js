import React from 'react';
import { Image } from 'react-native';

import styles from '../styles';
import logo from '../resources/logo.png';

export default () => (
  <Image source={ logo } style={ styles.logo } />
);
