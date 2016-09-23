import { AsyncStorage } from 'react-native';

import { showMessage, restoreStats }  from './actions';

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
    const action = showMessage('Error retrieving stats: ' + error.message);
    dispatch(action);
  }
};

export const saveHistory = async (dispatch, losses, wins) => {
  try {
    const errors = await AsyncStorage.multiSet([
      [LOSSES, losses],
      [WINS, wins]
    ]);
    if (errors !== null && errors !== undefined) {
      errors.filter(e => !!e).forEach(error => {
        const action = showMessage('Error saving stats: ' + error.message || error);
        dispatch(action);
      });
    }
  } catch (error) {
    const action = showMessage('Error saving stats: ' + error.message || error);
    dispatch();
  }
};
