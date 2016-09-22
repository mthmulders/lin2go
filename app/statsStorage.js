import { AsyncStorage } from 'react-native';
import Toast from 'react-native-simple-toast';

import { restoreStats }  from './actions';

const LOSSES = '@stats:losses';
const WINS = '@stats:wins';

export const loadHistory = async (dispatch) => {
  try {
    const values = await AsyncStorage.multiGet([LOSSES, WINS]);
    if (values !== null && values !== undefined) {
      // values = [ ["@Stats:losses",null], ["@Stats:wins",null] ]
      const losses = values.find(item => item[0] === LOSSES)[1] || 0;
      const wins = values.find(item => item[0] === WINS)[1] || 0;
      const action = restoreStats(losses, wins);
      dispatch(action);
    }
  } catch (error) {
    Toast.show('Error retrieving stats: ' + error.message || error, Toast.LONG);
  }
};

export const saveHistory = async (losses, wins) => {
  try {
    const errors = await AsyncStorage.multiSet([
      [LOSSES, losses],
      [WINS, wins]
    ]);
    if (errors !== null && errors !== undefined) {
      errors.filter(e => !!e).forEach(error => {
        Toast.show('Error saving stats: ' + error.message || error, Toast.LONG);
      });
    }
  } catch (error) {
    Toast.show('Error saving stats: ' + error.message || error, Toast.LONG);
  }
};
