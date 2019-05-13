import * as TYPES from '../action-types';
import { getUserInfo } from '../../api/course';

let person = {
  queryUserInfo() {
    return {
      type: TYPES.GET_USER_INFO,
      payload: getUserInfo()
    }
  }
};

export default person;