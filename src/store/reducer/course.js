import * as TYPES from '../action-types';

let INIT_STATE = {
  carouselData: []
};

export default function course(state = INIT_STATE, action) {
  state = JSON.parse(JSON.stringify(state));
  let { payload } = action;
  switch (action.type) {
    case TYPES.GET_COURSE_CAROUSEL:
      let { code: carouselCode, data: carouselData} = payload;
      if (parseFloat(carouselCode) === 0) {
        state.carouselData = carouselData;
      }
      break;
    default:
      break;
  }
  return state;
};