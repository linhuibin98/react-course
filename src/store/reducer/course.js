import * as TYPES from '../action-types';

let INIT_STATE = {
  carouselData: [],
  courseData: {
    total: 1,
    limit: 10,
    page: 1,
    data: []
  }
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
    case TYPES.COURSE_QUERY_LIST:
      let {result, flag, courseType} = action;
      state.courseType = courseType;
      if (parseFloat(result.code) === 0) {
        state.courseData.total = parseFloat(result.total);
        state.courseData.limit = parseFloat(result.limit);
        state.courseData.page = parseFloat(result.page);
        if (flag === 'push') {
          state.courseData.data = state.courseData.data.concat(result.data)
        } else {
          state.courseData.data = result.data;
        }
      }
      break;
    default:
      break;
  }
  return state;
};

