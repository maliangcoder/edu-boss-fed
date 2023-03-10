/**
 * 课程内容请求模块
*/
import request from '@/utils/request'

// 分页查询课程信息
export const getSectionAndLesson = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}
