import * as TYPES from '../action-types';
import { homeCarouselData, queryCourseList, queryShopCart,  } from '../../api/course';

let course = {
  getCarouselData() {
    return {
      type: TYPES.GET_COURSE_CAROUSEL,
      payload: homeCarouselData()
    }
  },

  queryList(payload = {}) {
    let { limit = 10, page = 1, type = 'all', flag = 'push' } = payload;
    return async dispatch => {
      // api接口获取数据
      let result = await queryCourseList({
        limit,
        page,
        type
      });

      dispatch({
        type: TYPES.COURSE_QUERY_LIST,
        result,
        flag,
        courseType: type
      })
    }
  },

  queryUnpay() {
    return async dispatch => {
      let result = await queryShopCart(0);
      dispatch({
        type: TYPES.COURSE_UNPAY,
        result
      })
    }
  },

  queryPay() {
    return async dispatch => {
      let result = await queryShopCart(1);
      dispatch({
        type: TYPES.COURSE_PAY,
        result
      })
    }
  },

  isChecked(courseId) {
    return {
      type: TYPES.UNPAY_CHECKED,
      courseId
    }
  }
};

export default course;