/**
 * 课程课时请求模块
*/
import request from '@/utils/request'

// 保存或更新课时
export const saveOrUpdateLesson = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
