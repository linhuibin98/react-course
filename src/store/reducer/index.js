import { combineReducers } from 'redux';
import course from './course';
import person from './person';

export default combineReducers({
  course,
  person
});