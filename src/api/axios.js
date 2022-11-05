import axios from 'axios'
import AxiosCanceler from "./axiosCanceler";


const MESSAGES = {
  4: '请求不可用',
  5: '服务器错误',
  400: '请求错误',
  401: '请重新登录',
  403: '资源不可用',
  404: '未找到资源',
  500: '服务器处理请求错误',
  501: '不能处理的请求'
}

const server = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 超时时间
  withCredentials: true,
  // headers: {
  //   'Accept': 'application/json',
  //   'content-type': 'application/json'
  // }
})

server.interceptors.request.use(config => {
  // 将当前请求添加到 pending 中
  AxiosCanceler.addPending(config)
  return config
  // 在发送请求之前做些什么
}, err => {
  // 对请求错误做些什么
  return Promise.reject(err)
})

// 返回拦截器
server.interceptors.response.use(res => {
  // 在请求结束后，移除本次请求
  AxiosCanceler.removePending(res.config)
  if (res.status === 200) {
    return res.data
  }
  return Promise.reject({ status: res.status.code, message: res.message })
}, error => {
  // 在请求结束后，移除本次请求
  AxiosCanceler.removePending(err.config);
  let errMsg = MESSAGES[error.code] || error.message
  return Promise.reject(error.data ? { status: error.data.code, message: error.message } : { status: 0, message: errMsg })
})



function post(url, data, params, config) {
  return server.post(url, data, Object.assign({ params: params }, config))
}
function get(url, params, config) {
  return server.get(url, Object.assign({ params: params }, config))
}
function put(url, data, params, config) {
  return server.put(url, data, Object.assign({ params: params }, config))
}
function del(url, data, params, config) {
  return server.delete(url, Object.assign({ params: params, data: data }, config))
}
export default server
export {
  post,
  get,
  put,
  del,
}
