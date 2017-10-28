import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { hideStats } from '../actions';
import styles from '../styles';

const Stats = (props) => {
  const { losses, wins } = props.stats;
  return (
    <View>
      <Text>Games lost: { losses }</Text>
      <Text>Games won: { wins }</Text>
      <Button style={ styles.button } onPress={ props.hideStats }>
        <Text>Home</Text>
      </Button>
    </View>
  );
};

/**
 * Props:
 *  stats: {
 *    losses: number,
 *    wins: number
 *  }
 */

const mapStateToProps = (state) => {
  return {
    stats: state.stats
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideStats: () => dispatch(hideStats())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
