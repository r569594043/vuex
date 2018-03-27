import axios from 'axios';
import qs from 'qs';
import { API_BASE_URL } from 'config';


// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API_URL, // node环境的不同，对应不同的baseURL
  baseURL: API_BASE_URL, // node环境的不同，对应不同的baseURL
  timeout: 5000, // 请求的超时时间
  //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  withCredentials: true // 允许携带cookie
})

// 发送请求前处理request的数据
axios.defaults.transformRequest = [function (data) {
  let newData = ''
  for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}]

// request拦截器
// service.interceptors.request.use(
//   config => {
//     // 发送请求之前，要做的业务
//     return config
//   },
//   error => {
//     // 错误处理代码
    
//     return Promise.reject(error)
//   }
// )

// response拦截器
service.interceptors.response.use(
  response => {
    // 数据响应之后，要做的业务
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

// export default service




service.interceptors.request.use((config) => {
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data,
    });
  }
  return config;
}, error => Promise.reject(error));


function baseRequest(url, params, method = 'get') {
  return new Promise((resolve, reject) => {
    // axios[method](`${API_BASE_URL}${url}`, params).then((response) => {
    service[method](`${url}`, params).then((response) => {
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