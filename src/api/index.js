import axios from 'axios';
import Qs from 'qs';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = (data = {}) => Qs.stringify(data);
axios.interceptors.response.use(response => {
// Do something before response is sent
return response.data;
},error => {
// Do something with response error
return Promise.reject(error);
});

export default axios;