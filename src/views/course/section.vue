<template>
  <div class="course-section">
    <el-card>
      <div slot="header" class="card-header">
        {{ course.courseName  }}
        <el-button type="primary" size="small" @click="handleShowAddSection">添加阶段</el-button>
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
        :allow-drop="handleAllowDrop"
        @node-drop="handleSort"
      >
      <div class="inner" slot-scope="{node, data}">
        <span>{{ node.label }}</span>
        <span v-if="data.sectionName">
          <el-button size="small" @click.stop="handleEditSection(data)">编辑</el-button>
          <el-button size="small" type="primary" @click.stop="handleAddLeson(data)">添加课时</el-button>
          <el-select
            size="small"
            class="select-status"
            placeholder="请选择"
            v-model="data.status"
            @change="handleSectionStatusChange(data)"
          >
              <el-option label="隐藏" :value="0"></el-option>
              <el-option label="待更新" :value="1"></el-option>
              <el-option label="已发布" :value="2"></el-option>
            </el-select>
        </span>
        <span v-else>
          <el-button size="small" @click.stop="handleEditLesson(data, node.parent.data)">编辑</el-button>
          <el-button
            size="small"
            type="success"
            @click="$router.push({
              name: 'course-video',
              params: {
                courseId
              }
            })"
          >上传视频</el-button>
          <el-select
            size="small"
            class="select-status"
            placeholder="请选择"
            v-model="data.status"
            @change="handleLessonStatusChange(data)"
          >
            <el-option label="隐藏" :value="0"></el-option>
            <el-option label="未发布" :value="1"></el-option>
            <el-option label="已发布" :value="2"></el-option>
          </el-select>
        </span>
      </div>
      </el-tree>
    </el-card>
    <el-dialog
      title="添加课程阶段"
      :visible.sync="isAddSectionShow"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="course.courseName" disabled></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input v-model="section.sectionName"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input type="textarea" v-model="section.description"></el-input>
        </el-form-item>
        <el-form-item label="课程排序" prop="orderNum">
          <el-input-number v-model="section.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddSectionShow = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSection">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加课时"
      :visible.sync="isAddLessonShow"
      width="40%"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="课程名称">
          <el-input disabled v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="章节名称">
          <el-input disabled v-model="lesson.sectionName"></el-input>
        </el-form-item>
        <el-form-item label="课时名称">
          <el-input v-model="lesson.theme"></el-input>
        </el-form-item>
        <el-form-item label="时长">
          <el-input v-model.number="lesson.duration" type="number" autocomplete="off">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否开启试听">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="lesson.isFree"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="lesson.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddLessonShow = false">取 消</el-button>
        <el-button type="primary" @click="handleAddLesson">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getSectionAndLesson,
  saveOrUpdateSection,
  getBySectionId
} from '@/services/course-section'
import { saveOrUpdateLesson } from '@/services/course-lesson'
import { getCourseById } from '@/services/course'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    const section = {
      courseId: this.courseId,
      sectionName: '',
      description: '',
      orderNum: 0,
      status: 0
    }
    const lesson = {
      courseId: this.courseId,
      sectionId: undefined,
      sectionName: '',
      theme: '',
      duration: 0,
      isFree: false,
      orderNum: 0,
      status: 0
    }
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label(data: any) {
          return data.sectionName || data.theme
        }
      },
      course: {},
      isAddSectionShow: false,
      isAddLessonShow: false,
      form: {},
      section,
      lesson
    }
  },
  created() {
    this.loadSections()
    this.loadCourse()
  },
  methods: {
    async loadSections() {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    },
    async loadCourse() {
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
    },
    async handleSectionStatusChange(section: any) {
      await saveOrUpdateSection(section)
      this.$message.success('操作成功')
    },
    async handleLessonStatusChange(lesson: any) {
      await saveOrUpdateLesson(lesson)
      this.$message.success('操作成功')
    },
    handleShowAddSection() {
      this.section = {
        courseId: this.courseId,
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0
      }
      this.isAddSectionShow = true
    },
    async handleAddSection() {
      const { data } = await saveOrUpdateSection(this.section)
      if (data.code === '000000') {
        this.loadSections()
        this.$message.success('添加成功')
        ;(this.$refs.form as Form).resetFields()
      }
      this.isAddSectionShow = false
    },
    // 编辑
    async handleEditSection(section: any) {
      const { data } = await getBySectionId(section.id)
      this.section = data.data
      this.isAddSectionShow = true
    },
    // 添加课时
    handleAddLeson(data: any) {
      this.lesson = {
        courseId: this.courseId,
        sectionId: data.id,
        sectionName: data.sectionName,
        theme: '',
        duration: 10,
        isFree: false,
        orderNum: 0,
        status: 0
      }
      this.isAddLessonShow = true
    },
    async handleAddLesson() {
      const { data } = await saveOrUpdateLesson(this.lesson)
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.isAddLessonShow = false
        this.loadSections()
      } else {
        this.$message.error(data.mesg)
      }
    },
    handleEditLesson(lesson: any,section: any) {
      this.lesson = lesson
      this.lesson.sectionName = section.sectionName
      this.isAddLessonShow = true
    },
    handleAllowDrop(draggingNode: any, dropNode: any, type: any) {
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },
    async handleSort(draggingNode: any, dropNode: any, type: any, event: any) {
      console.log(dropNode.parent)
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (dropNode.data.lessonDTOS) {
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            return saveOrUpdateLesson({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('排序成功')
      } catch (error) {
        this.$message.error('排序失败')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.inner {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #efeef5;
}
::v-deep .el-tree-node__content {
  height: auto;
}
.select-status {
  max-width: 100px;
  margin-left: 10px;
}
</style>
