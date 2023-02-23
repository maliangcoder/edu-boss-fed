/**
 * 资源相关请求模块
*/
import request from '@/utils/request'

// 新增或者更新菜单
export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}
