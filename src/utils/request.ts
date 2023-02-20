import axios from 'axios'
import store from '@/store'
const request = axios.create({
  // 配置选项
  // BaseUrl
})

// 请求拦截
request.interceptors.request.use(function (config) {
  // 配置 config 信息来实现业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  // 要返回 config ，否则请求就会发不出去
  return config
}, function (error) {
  return Promise.reject(error)
})
// 相应拦截

export default request
