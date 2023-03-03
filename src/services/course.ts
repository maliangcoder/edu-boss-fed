/**
 * 课程相关请求模块
*/
import request from '@/utils/request'

// 分页查询课程信息
export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}