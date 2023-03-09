/**
 * 课程相关请求模块
*/
import request from '@/utils/request'
import type { AxiosProgressEvent } from 'axios'

// 分页查询课程信息
export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 课程上下架
export const changeCourseStatus = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

// 保存或者更新课程信息
export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 上传/更新课程图片
export const uploadCourseImage = (data: any, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // html5 新增的上传响应事件 progress
    onUploadProgress
  })
}
