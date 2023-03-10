<template>
  <div class="course-section">
    <el-card>
      <div slot="header">
        课程名称
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
      >
      <div class="inner" slot-scope="{node, data}">
        <span>{{ node.label }}</span>
        <span v-if="data.sectionName">
          <el-button size="small">编辑</el-button>
          <el-button size="small" type="primary">添加课时</el-button>
          <el-button size="small">已隐藏</el-button>
        </span>
        <span v-else>
          <el-button size="small">编辑</el-button>
          <el-button size="small" type="success">上传视频</el-button>
          <el-button size="small">已隐藏</el-button>
        </span>
      </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionAndLesson } from '@/services/course-section'

export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label(data: any) {
          return data.sectionName || data.theme
        }
      }
    }
  },
  created() {
    this.loadSections()
  },
  methods: {
    async loadSections() {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    }
  }
})
</script>

<style lang="scss" scoped>
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
</style>
