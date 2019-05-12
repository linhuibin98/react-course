import axios from './index';

export function checkLogin() {
  return axios.get('/personal/login');
}