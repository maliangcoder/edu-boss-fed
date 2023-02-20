import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import qs from 'qs'
const request = axios.create({
  // 配置选项
  // BaseUrl
})
function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken() {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

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

let isRfreshing = false // 控制刷新token的状态
let requests: any[] = [] // 存储刷新期间过来的401请求
// 响应拦截
request.interceptors.response.use(function (response) {
  // 响应成功执行，状态码为2xx进入
  return response
}, async function (error) { // 响应失败执行，状态码超出2xx执行这里
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了2xx范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token无效（没有提供token，token是无效的，token过期了）
      // 如果有refresh_token 则尝试使用 refresh_token 获取新的 access_token
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 刷新 token
      if (!isRfreshing) {
        isRfreshing = true // 开启刷新状态
        // 尝试刷新获取新的token
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 token 失败')
          }
          // 成功了 -> 把本次失败的请求重新发出去
          // 把刷新拿到的新的 access_token 更新到容器中和本地储存中
          store.commit('setUser', res.data.content) // 刷新 token 成功
          // 把requests队列中的请求重新发出去
          requests.forEach(cb => cb())
          // 把requests数组清空，否则会累积很多在刷新期间失败的请求
          requests = []
          // console.log(error.config) // 请求失败的配置信息在 error.config 中
          return request(error.config) // 第一次请求失败
        }).catch(err => {
          console.log(err)
          // 把当前登录用户状态清除
          store.commit('setUser', null)
          // 失败了 -> 跳转登录页重新获取新的 token
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRfreshing = false // 重置刷新状态
        })
      }

      // 刷新状态下，把请求挂起，放到requests中
      return new Promise(resolve => {
        // 利用promise中resolve方法将刷新token期间，请求失败的方法存入requests数组中
        requests.push(() => {
          resolve(request(error.config))
        })
      })
      // 如果没有，则直接跳转登录页
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
    // 400
    // 401
    // 403
    // 404
    // 500
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }
  // 把请求失败的错误对象继续抛出，扔给下一个上一个调用者
  return Promise.reject(error)
})

export default request
