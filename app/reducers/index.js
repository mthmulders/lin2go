import {  Reducer } from 'react-native-router-flux';

import { START_GAME } from '../actions';
import startGame from './startGame';

export default (params) => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
        console.log("ACTION:", action);
        switch(action.type) {
          case START_GAME: return startGame(state, action)
          default        : return defaultReducer(state, action);
        }
    };
};
