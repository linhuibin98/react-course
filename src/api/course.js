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

// 退出登录
export function exitLogin() {
  return axios.get('/personal/out');
}

// 注册
export function userRegister(payload) {
  return axios.post('/personal/register', payload);
}

// 获取首页轮播图数据
export function homeCarouselData() {
  return axios.get('/course/banner');
}
