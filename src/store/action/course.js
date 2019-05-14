import * as TYPES from '../action-types';
import { homeCarouselData } from '../../api/course';

let course = {
  getCarouselData() {
    return {
      type: TYPES.GET_COURSE_CAROUSEL,
      payload: homeCarouselData()
    }
  }
};

export default course;