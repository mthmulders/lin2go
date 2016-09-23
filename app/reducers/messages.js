import { CLEAR_MESSAGE, SHOW_MESSAGE } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case CLEAR_MESSAGE:
      return { ...state, message: undefined };
    case SHOW_MESSAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
};