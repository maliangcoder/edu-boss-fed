/**
 * 资源分类相关请求模块
*/
import request from '@/utils/request'

// 新增或者更新菜单
export const getResoureCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
