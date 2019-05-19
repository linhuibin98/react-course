import * as TYPES from '../action-types';

let INIT_STATE = {
  carouselData: [],
  courseData: {
    total: 1,
    limit: 10,
    page: 1,
    data: []
  },
  shopCart: {
    unPay: [],
    pay: [],
    checkedAll: true
  }
};

export default function course(state = INIT_STATE, action) {
  state = JSON.parse(JSON.stringify(state));
  let isAllChecked = (data) => {
    for(let i = 0; i < data.length; i++) {
      if (!data[i].check) {
        state.shopCart.checkedAll = false;
        return;
      }
    }
    state.shopCart.checkedAll = true;
  } 
  let { payload } = action;
  switch (action.type) {
    case TYPES.GET_COURSE_CAROUSEL:   // 获取轮播图数据
      let { code: carouselCode, data: carouselData} = payload;
      if (parseFloat(carouselCode) === 0) {
        state.carouselData = carouselData;
      }
      break;
    case TYPES.COURSE_QUERY_LIST:    //获取课程列表
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
    case TYPES.COURSE_UNPAY:      // 获取未支付订单
      if (parseFloat(action.result.code) === 0) {
        state.shopCart.unPay = action.result.data.map(item => {
          item.check = true;
          return item;
        })
      }
      break;
    case TYPES.COURSE_PAY:      // 获取已支付订单
      if (parseFloat(action.result.code) === 0) {
        state.shopCart.pay = action.result.data;
      }
      break;
    case TYPES.UNPAY_CHECKED:
      let { courseId } = action;
      if (courseId === -1) {
        state.shopCart.checkedAll = !state.shopCart.checkedAll;
        state.shopCart.unPay = state.shopCart.unPay.map(item => {
          item.check = state.shopCart.checkedAll;
          return item;
        })
      } else {
        state.shopCart.unPay = state.shopCart.unPay.map(item => {
          if (parseFloat(item.id) === parseFloat(courseId)) {
            item.check = !item.check;
            return item;
          }
          return item;
        })
        isAllChecked(state.shopCart.unPay);
      }
      break;
    default:
      break;
  }
  return state;
};

