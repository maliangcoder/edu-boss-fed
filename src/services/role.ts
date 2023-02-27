/**
 * 角色相关请求模块
*/
import request from '@/utils/request'

// 获取角色列表
export const getRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

// 添加或更新角色
export const saveOrUpdateRole = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

// 获取角色信息
export const getRoleById = (id: number | string) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

// 删除角色
export const deleteRole = (id: number | string) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

// 获取所有角色
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 查询用户角色
export const getUserRole = (userId: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
