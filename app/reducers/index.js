import {  Reducer } from 'react-native-router-flux';

export default (params) => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    };
};
