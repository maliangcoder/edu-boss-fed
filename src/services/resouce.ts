/**
 * 资源相关请求模块
*/
import request from '@/utils/request'

// 查询或筛选资源列表
export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 更新资源
export const resourceSaveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

// 删除资源
export const deleteResource = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

// 获取角色拥有的资源
export const getRoleResources = (roleId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

// 角色分配资源
interface dateType {
  roleId: number | string
  resourceIdList: Array<number>
}
export const allocateRoleResources = (data: dateType) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}
