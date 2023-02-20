/**
 * 用户相关请求模块
*/
import request from '@/utils/request'
import qs from 'qs'
interface User {
  phone: string
  password: string
}
export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',

    /**
     * 如果 data 是普通对象，则 Content-Type 是application/json
     * 如果 data 是 qs.stringify(data) 转换之后的数据：key=value,则Content-type会被设置为application/x-www-form-urlencoded
     * axios默认是 application/json 格式的数据
    */
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

/**
 * 用户相关信息
*/
export const getUserInfo = () => {
  return request({
    url: '/front/user/getInfo',
    method: 'GET'
  })
}
