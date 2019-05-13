import axios from './index';

//检查是否登录
export function checkLogin() {
  return axios.get('/personal/login');
}

//=> 登录
export function login(payload) {
  return axios.post('/personal/login', payload);
}

// 获取个人信息
export function getUserInfo() {
  return axios.get('/personal/info');
}