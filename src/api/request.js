import axios from 'axios';
import qs from 'qs';
import { API_BASE_URL } from 'config';

axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data,
    });
  }
  return config;
}, error => Promise.reject(error));


function baseRequest(url, params, method = 'get') {
  return new Promise((resolve, reject) => {
    axios[method](`${API_BASE_URL}${url}`, params).then((response) => {
      const json = response.data;
      if (parseInt(json.code, 10) === 0) {
        resolve(json.data);
      } else {
        reject(new Error(json.message));
      }
    }).catch((error) => {
      console.error(error);
      reject(new Error('请求接口失败'));
    });
  });
}

export function get(url, params) {
  return baseRequest(url, params)
}
export function post(url, params) {
  return baseRequest(url, params, 'post')
}