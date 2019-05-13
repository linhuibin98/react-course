import * as TYPES from '../action-types';

let INIT_STATE = {
  userInfo: null
};

export default function person(state = INIT_STATE, action) {
  state = JSON.parse(JSON.stringify(state));
  let payload = action.payload;
  switch (action.type) {
    case TYPES.GET_USER_INFO: 
      state.userInfo = payload;
      break;
    default:
      break;
  }
  return state;
};